const createValidator = require('../utils/createValidator');

const homepageAttrs = ['homepage', 'homepageURL'];

module.exports = createValidator({
  name: homepageAttrs,

  validator: ({ attrVal, metadata, context, keyName }) => {
    const attribute = homepageAttrs.find(
      (homepageAttr) => homepageAttr !== keyName
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
  messages: {
    missingAttribute: "Didn't find attribute '{{ attribute }}' in the metadata"
  },
  fixable: true
});
