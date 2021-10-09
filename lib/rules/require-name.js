const createValidator = require('../utils/createValidator');

const nameReg = /^name(:\S+)?$/;

module.exports = createValidator(
  'name',
  true,
  ({ attrVal, context, metadata }) => {
    let iteratedKeyNames = [];
    for (let attrValue of attrVal) {
      if (iteratedKeyNames.includes(attrValue.key)) {
        context.report({
          loc: attrValue.loc,
          messageId: 'multipleNames'
        });
      } else {
        iteratedKeyNames.push(attrValue.key);
      }
    }

    const metadataValues = Object.values(metadata);

    if (
      metadataValues.find(
        (attrValue, attrValIndex) =>
          attrValIndex !== 0 &&
          nameReg.test(attrValue[0] ? attrValue[0].key : attrValue.key) &&
          !nameReg.test(
            metadataValues[attrValIndex - 1][0]
              ? metadataValues[attrValIndex - 1][0].key
              : metadataValues[attrValIndex - 1].key
          )
      )
    ) {
      const sourceCode = context.getSourceCode();
      const comments = sourceCode.getAllComments();
      const endingMetadataComment = comments.find(
        (comment) =>
          comment.value.trim() === '==/UserScript==' && comment.type === 'Line'
      );
      context.report({
        loc: {
          start: comments.find(
            (comment) =>
              comment.value.trim() === '==UserScript==' &&
              comment.type === 'Line'
          ).loc.start,
          end: endingMetadataComment
            ? endingMetadataComment.loc.end
            : { line: sourceCode.lines.length, column: 0 }
        },
        messageId: 'nameAtBeginning',
        fix: function (fixer) {
          let fixerRules = [];
          for (let attrValue of attrVal) {
            // istanbul ignore else
            if (!Array.isArray(attrValue)) {
              attrValue = [attrValue];
            }
            for (let deepAttrValue of attrValue) {
              fixerRules.push(
                fixer.removeRange(
                  deepAttrValue.comment.range.map((val, index) =>
                    index === 0
                      ? val -
                        context
                          .getSourceCode()
                          .lines[deepAttrValue.loc.start.line - 1].split(
                            '//'
                          )[0].length -
                        1
                      : val
                  )
                )
              );
            }
          }
          fixerRules.push(
            fixer.insertTextAfterRange(
              context
                .getSourceCode()
                .getAllComments()
                .find((val) => val.value.trim() === '==UserScript==').range,
              attrVal
                .sort((attrValue1, attrValue2) =>
                  attrValue1.key === 'name'
                    ? -1
                    : attrValue2.key === 'name'
                    ? 1
                    : 0
                )
                .map(
                  (attrValue) =>
                    `\n${
                      context
                        .getSourceCode()
                        .lines[attrValue.loc.start.line - 1].split('//')[0]
                    }//${attrValue.comment.value}`
                )
                .join('')
            )
          );
          return fixerRules;
        }
      });
    }
  },
  {
    multipleNames: 'Include only one name for each language',
    nameAtBeginning: 'The names should be at the beginning of the metadata'
  },
  true,
  nameReg,
  true
);
