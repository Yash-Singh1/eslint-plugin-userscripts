const createValidator = require('../utils/createValidator');

const updateURLs = ['downloadURL', 'updateURL'];

module.exports = createValidator(
  updateURLs,
  false,
  (attrVal, index, indexMatch, metadata, context, attr) => {
    const attribute = updateURLs.find((updateURL) => updateURL !== attr);
    if (!metadata[attribute]) {
      context.report({
        loc: attrVal.loc,
        messageId: 'missingAttribute',
        data: {
          attribute: attribute
        },
        fix: function (fixer) {
          return fixer.insertTextAfterRange(
            attrVal.comment.range,
            `\n${context
              .getSourceCode()
              .lines[attrVal.comment.loc.start.line - 1].replace(
                /^(\s*\/\/\s*@)\S*/,
                '$1' + attribute
              )}`
          );
        }
      });
    }
  },
  {
    missingAttribute: "Didn't find attribute '{{ attribute }}' in the metadata"
  },
  true
);
