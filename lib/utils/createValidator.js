module.exports = function createValidator(
  name,
  required,
  validator = () => {},
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
          required
            ? `require ${validator.length === 0 ? '' : 'and validate '}`
            : 'validate '
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
      comments
        .filter((comment) => comment.type === 'Line')
        .forEach((comment) => {
          if (done) {
            return;
          }

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
            if (metadata[key]) {
              if (!Array.isArray(metadata[key]))
                metadata[key] = [metadata[key]];
              metadata[key].push(val);
              return;
            }
            metadata[key] = val;
          }
        });

      const metadataKeys = Object.keys(metadata);
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
      } else if (name.find((subName) => metadataKeys.includes(subName))) {
        name.forEach((subName) => {
          if (!metadataKeys.includes(subName)) {
            return;
          }
          let indexMatch = metadataKeys.indexOf(subName);
          if (Array.isArray(metadata[subName])) {
            metadata[subName].forEach((attrVal, index) => {
              validator(attrVal, index, indexMatch, metadata, context, subName);
              indexMatch = metadataKeys.indexOf(subName, indexMatch);
            });
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
        });
      }

      return {};
    }
  };
};
