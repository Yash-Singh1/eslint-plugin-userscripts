module.exports = function createValidator(
  name,
  required,
  validator = false,
  messages = {},
  fixable = false
) {
  if (typeof name === 'string') {
    name = [name];
  }

  return {
    meta: {
      type: 'suggestion',
      docs: {
        description: `${
          required ? `require ${validator ? 'and validate ' : ''}` : 'validate '
        }${name.join(' and ')} in the metadata for userscripts`,
        category: 'Best Practices'
      },
      schema: required
        ? [
            {
              enum: ['required', 'optional'],
              default: 'required'
            }
          ]
        : undefined,
      messages: {
        missingAttribute: `Didn't find attribute '${name}' in the metadata`,
        ...messages
      },
      fixable: fixable ? 'code' : undefined
    },
    create: (context) => {
      const sourceCode = context.getSourceCode();
      const comments = sourceCode.getAllComments();

      let inMetadata = false;
      let done = false;
      let metadata = {};
      for (const comment of comments.filter(
        (comment) => comment.type === 'Line'
      )) {
        if (done) {
          continue;
        }

        // istanbul ignore else
        if (inMetadata && comment.value.trim() === '==/UserScript==') {
          done = true;
        } else if (!inMetadata && comment.value.trim() === '==UserScript==') {
          inMetadata = true;
        } else if (inMetadata && comment.value.trim().startsWith('@')) {
          const key = comment.value.trim().slice(1).split(' ')[0];
          const val = {
            val: comment.value
              .trim()
              .slice(1)
              .split(' ')
              .slice(1)
              .join(' ')
              .trim(),
            loc: comment.loc,
            comment
          };
          // istanbul ignore else
          if (metadata[key]) {
            if (!Array.isArray(metadata[key])) metadata[key] = [metadata[key]];
            metadata[key].push(val);
            continue;
          }
          metadata[key] = val;
        }
      }

      const metadataKeys = Object.keys(metadata);
      // istanbul ignore else
      if (
        required &&
        (!context.options[0] || context.options[0] === 'required') &&
        !metadataKeys.includes(name[0])
      ) {
        context.report({
          loc: {
            column: 0,
            line: 1
          },
          messageId: 'missingAttribute'
        });
      } else if (
        validator &&
        name.find((subName) => metadataKeys.includes(subName))
      ) {
        for (const subName of name) {
          if (!metadataKeys.includes(subName)) {
            continue;
          }
          let indexMatch = metadataKeys.indexOf(subName);
          if (Array.isArray(metadata[subName])) {
            for (const [index, attrVal] of metadata[subName].entries()) {
              validator(attrVal, index, indexMatch, metadata, context, subName);
              indexMatch = metadataKeys.indexOf(subName, indexMatch);
            }
          } else {
            validator(
              metadata[subName],
              0,
              indexMatch,
              metadata,
              context,
              subName
            );
          }
        }
      }

      return {};
    }
  };
};
