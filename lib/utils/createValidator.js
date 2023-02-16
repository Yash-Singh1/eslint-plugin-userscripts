const parse = require('./parse');

/**
 * The metadata information on an attribute
 *
 * @typedef {Object} Metadata
 * @property {string} val The value extracted from the comment
 * @property {import('acorn')['SourceLocation']} loc The location of the comment
 * @property {{
 *   loc: import('acorn')['SourceLocation'];
 *   type: 'Line';
 *   range: [number, number];
 *   value: string;
 * }} comment
 *   The comment itself
 * @property {string} key The name of the key of the attribute
 */

/**
 * The callback for validators on validation rules
 *
 * @callback validatorCallback
 * @param {{
 *   attrVal: Metadata | Metadata[];
 *   index: number | number[];
 *   indexMatch: number | number[];
 *   metadata:
 *     | Object<string, Metadata | Metadata[]>
 *     | Object<string, Metadata | Metadata[]>[];
 *   context: RuleContext;
 *   keyName: string | string[];
 * }} validationInfo
 *   The information based on which the validator validates the metadata
 */

/**
 * The main options for the validator creator function
 *
 * @typedef {Object} ValidatorOptions
 * @property {string | string[]} name The name of the attribute(s) that the rule
 *   validates
 * @property {boolean} required Whether the attribute(s) are required or not
 * @property {false | validatorCallback} [validator=false] The custom validator
 *   function. Default is `false`
 * @property {Object<string, string>} [messages={}] Messages that are needed
 *   when reporting in the validator. Default is `{}`
 * @property {boolean} [fixable=false] Whether the rule is fixable or not.
 *   Default is `false`
 * @property {RegExp} [regexMatch] A regular expression to match all keys,
 *   defaults to usage of name
 * @property {boolean} [runOnce=false] A boolean representing whether the
 *   validator should run once on all matches. Default is `false`
 * @property {Object} [schema] The configuration options
 */

/**
 * Function to create a validator rule
 *
 * @param {ValidatorOptions} options The rule options
 * @returns {import('eslint/lib/shared/types.js')['Rule']} The resulting
 *   validation rule
 */
module.exports = function createValidator({
  name,
  required = false,
  validator = false,
  messages = {},
  fixable = false,
  regexMatch = new RegExp(
    '^(' + (typeof name === 'string' ? name : name.join('|')) + ')$'
  ),
  runOnce = false,
  schema
}) {
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
        : schema || undefined,
      messages: {
        missingAttribute: `Didn't find attribute '${name}' in the metadata`,
        ...messages
      },
      fixable: fixable ? 'code' : undefined
    },
    create: (context) => {
      const sourceCode = context.getSourceCode();
      const comments = sourceCode.getAllComments();

      const result = parse(sourceCode);
      let metadata = {};
      for (const line of result.lines.filter((line) => line.metadataInfo)) {
        const actualValue = line.value.trim().slice(2);
        const lengthDiff = line.value.length - actualValue.length - 2;
        const newLoc = {
          start: {
            line: line.lineLoc.start.line,
            column: line.lineLoc.start.column + lengthDiff
          },
          end: line.lineLoc.end
        };
        const val = {
          val: line.metadataValue.value,
          loc: newLoc,
          comment: {
            value: actualValue,
            range: [
              sourceCode.getIndexFromLoc(line.lineLoc.start) + lengthDiff,
              sourceCode.getIndexFromLoc(line.lineLoc.end)
            ],
            loc: newLoc,
            type: 'Line'
          },
          key: line.metadataValue.key
        };
        // istanbul ignore else
        if (metadata[line.metadataValue.key]) {
          if (!Array.isArray(metadata[line.metadataValue.key]))
            metadata[line.metadataValue.key] = [
              metadata[line.metadataValue.key]
            ];
          metadata[line.metadataValue.key].push(val);
          continue;
        }
        metadata[line.metadataValue.key] = val;
      }

      const metadataKeys = Object.keys(metadata);
      // istanbul ignore else
      if (
        required &&
        result.enteredMetadata !== -1 &&
        (!context.options[0] || context.options[0] === 'required') &&
        !metadataKeys.some((name) => regexMatch.test(name))
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
        metadataKeys.some((name) => regexMatch.test(name))
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
