import { NonNullishComment } from '../utils/comment';
import { createValidator } from '../utils/createValidator';

const nameReg = /^name(:[A-Za-z-]+)?$/;

export default createValidator({
  name: ['name'],
  required: true,
  validator: ({ attrVal, context, metadata }) => {
    const iteratedKeyNames = new Set<string>();
    for (const attrValue of attrVal) {
      if (iteratedKeyNames.has(attrValue.key)) {
        context.report({
          loc: attrValue.loc,
          messageId: 'multipleNames'
        });
      } else {
        iteratedKeyNames.add(attrValue.key);
      }
    }

    const metadataValues = Object.values(metadata).map((attrValue) => {
      return Array.isArray(attrValue) ? attrValue[0] : attrValue;
    });

    const sourceCode = context.sourceCode;
    const comments = sourceCode.getAllComments();

    const startComment = comments.find(
      (comment) =>
        comment.value.trim() === '==UserScript==' && comment.type === 'Line'
    ) as NonNullishComment | undefined;

    let unorderedNames = false;
    for (const [attrValIndex, attrValue] of metadataValues.entries()) {
      if (
        attrValIndex > 0 &&
        nameReg.test(attrValue.key) &&
        !nameReg.test(metadataValues[attrValIndex - 1].key)
      ) {
        unorderedNames = true;
        break;
      }
    }

    if (startComment && unorderedNames) {
      const endingMetadataComment = comments.find(
        (comment) =>
          comment.value.trim() === '==/UserScript==' && comment.type === 'Line'
      ) as NonNullishComment | undefined;

      context.report({
        loc: {
          start: startComment.loc.start,
          end: endingMetadataComment
            ? endingMetadataComment.loc.end
            : { line: sourceCode.lines.length, column: 0 }
        },
        messageId: 'nameAtBeginning',
        fix: function (fixer) {
          const fixerRules = [];
          for (const attrValue of attrVal) {
            fixerRules.push(
              fixer.removeRange([
                attrValue.comment.range[0] -
                  context.sourceCode.lines[attrValue.loc.start.line - 1].split(
                    '//'
                  )[0].length -
                  1,
                attrValue.comment.range[1]
              ])
            );
          }

          attrVal.sort((attrValue1, attrValue2) =>
            attrValue1.key === 'name' ? -1 : attrValue2.key === 'name' ? 1 : 0
          );

          fixerRules.push(
            fixer.insertTextAfterRange(
              startComment.range,
              attrVal
                .map(
                  (attrValue) =>
                    `\n${
                      context.sourceCode.lines[
                        attrValue.loc.start.line - 1
                      ].split('//')[0]
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
  messages: {
    multipleNames: 'Include only one name for each language',
    nameAtBeginning: 'The names should be at the beginning of the metadata'
  },
  fixable: true,
  regexMatch: nameReg,
  runOnce: true
});
