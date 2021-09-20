const createValidator = require('../utils/createValidator');

const homepageAttrs = ['homepage', 'homepageURL'];

module.exports = createValidator(
  homepageAttrs,
  false,
  (attrVal, index, indexMatch, metadata, context, attr) => {
    const attribute = homepageAttrs.find(
      (homepageAttr) => homepageAttr !== attr
    );
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
