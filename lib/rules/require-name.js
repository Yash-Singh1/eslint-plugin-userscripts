const createValidator = require('../utils/createValidator');

module.exports = createValidator(
  'name',
  true,
  (attrVal, index, indexMatch, metadata, context) => {
    if (index > 0) {
      context.report({
        loc: attrVal.loc,
        messageId: 'multipleNames'
      });
    }
    if (indexMatch > 0) {
      context.report({
        loc: attrVal.loc,
        messageId: 'nameAtBeginning',
        fix: function (fixer) {
          return [
            fixer.removeRange(
              attrVal.comment.range.map((val, index) =>
                index === 0
                  ? val -
                    context
                      .getSourceCode()
                      .lines[attrVal.comment.loc.start.line - 1].split('//')[0]
                      .length -
                    1
                  : val
              )
            ),
            fixer.insertTextAfterRange(
              context
                .getSourceCode()
                .getAllComments()
                .find((val) => val.value.trim() === '==UserScript==').range,
              `\n${
                context
                  .getSourceCode()
                  .lines[attrVal.comment.loc.start.line - 1].split('//')[0]
              }//${attrVal.comment.value}`
            )
          ];
        }
      });
    }
  },
  {
    multipleNames: 'Include only one name',
    nameAtBeginning: 'The first metadata attribute should be the name'
  },
  true
);
