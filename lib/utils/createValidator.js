/**
 * The metadata information on an attribute
 * @typedef {Object} Metadata
 * @property {string} val The value extracted from the comment
 * @property {import('acorn')['SourceLocation']} loc The location of the comment
 * @property {import('acorn')['Node']} comment The comment itself
 * @property {string} key The name of the key of the attribute
 */

/**
 * The callback for validators on validation rules
 * @callback validatorCallback
 * @param {{attrVal: Metadata | Metadata[], index: number | number[], indexMatch: number | number[], metadata: Object.<string, Metadata | Metadata[]> | Array<Object.<string, Metadata | Metadata[]>>, context: RuleContext, keyName: string | string[] }} validationInfo The information based on which the validator validates the metadata
 */

/**
 * Function to create a validator rule
 * @param {string|string[]} name The name of the attribute that it validates, can be a list of attributes
 * @param {boolean} required Whether the attribute(s) are required or not
 * @param {false|validatorCallback} [validator=false] The custom validator function, defaults to false
 * @param {Object.<string, string>} [messages={}] Messages that are needed when reporting in the validator
 * @param {boolean} [fixable=false] Whether the rule is fixable or not
 * @param {RegExp} [regexMatch] A regular expression to match all keys, defaults to usage of name
 * @param {boolean} [runOnce=false] A boolean representing whether the validator should run once on all matches
 * @returns {import('eslint/lib/shared/types.js')['Rule']} The resulting validation rule
 */
module.exports = function createValidator(
  name,
  required,
  validator = false,
  messages = {},
  fixable = false,
  regexMatch = new RegExp(
    '^(' + (typeof name === 'string' ? name : name.join('|')) + ')$'
  ),
  runOnce = false
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
      let wentInMetadata = false;
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
          wentInMetadata = true;
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
            comment,
            key
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
        wentInMetadata &&
        (!context.options[0] || context.options[0] === 'required') &&
        !metadataKeys.find((name) => regexMatch.test(name))
      ) {
        context.report({
          loc: comments.find(
            (comment) =>
              comment.value.trim() === '==UserScript==' &&
              comment.type === 'Line'
          ).loc,
          messageId: 'missingAttribute'
        });
      } else if (
        validator &&
        metadataKeys.find((name) => regexMatch.test(name))
      ) {
        if (runOnce) {
          const matchingMetadataKeyIndex = [];
          for (const metadataKeyIndex in metadataKeys) {
            if (regexMatch.test(metadataKeys[metadataKeyIndex])) {
              matchingMetadataKeyIndex.push(+metadataKeyIndex);
            }
          }
          const attributeValues = matchingMetadataKeyIndex
            .map((index) => metadata[metadataKeys[index]])
            .reduce(
              (accumalator, metadataPart) =>
                Array.isArray(metadataPart)
                  ? [...accumalator, ...metadataPart]
                  : [...accumalator, metadataPart],
              []
            );
          validator({
            attrVal: attributeValues,
            index: [...attributeValues.keys()],
            indexMatch: matchingMetadataKeyIndex.reduce(
              (accumalator, metadataKeyIndex) =>
                Array.isArray(metadata[metadataKeys[metadataKeyIndex]])
                  ? [
                      ...accumalator,
                      ...metadata[metadataKeys[metadataKeyIndex]].map(
                        () => metadataKeys
                      )
                    ]
                  : [...accumalator, metadataKeyIndex],
              []
            ),
            metadata,
            context,
            keyName: matchingMetadataKeyIndex.map(
              (index) => metadataKeys[index]
            )
          });
        } else {
          for (const metadataKeyIndex in metadataKeys) {
            if (!regexMatch.test(metadataKeys[metadataKeyIndex])) {
              continue;
            }
            if (Array.isArray(metadata[metadataKeys[metadataKeyIndex]])) {
              for (const [index, attrVal] of metadata[
                metadataKeys[metadataKeyIndex]
              ].entries()) {
                validator({
                  attrVal,
                  index,
                  indexMatch: metadataKeyIndex,
                  metadata,
                  context,
                  keyName: metadataKeys[metadataKeyIndex]
                });
              }
            } else {
              validator({
                attrVal: metadata[metadataKeys[metadataKeyIndex]],
                index: 0,
                indexMatch: metadataKeyIndex,
                metadata,
                context,
                keyName: metadataKeys[metadataKeyIndex]
              });
            }
          }
        }
      }

      return {};
    }
  };
};
