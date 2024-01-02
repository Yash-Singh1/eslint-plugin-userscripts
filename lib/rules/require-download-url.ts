import { createValidator } from '../utils/createValidator';

export default createValidator({
  name: 'updateURL',
  validator: ({ attrVal, metadata, context, keyName }) => {
    if (keyName === 'updateURL' && !metadata['downloadURL']) {
      context.report({
        loc: attrVal.loc,
        messageId: 'includeDownloadURL',
        fix: function (fixer) {
          return fixer.insertTextAfterRange(
            attrVal.comment.range,
            `\n${context.sourceCode.lines[
              attrVal.comment.loc.start.line - 1
            ].replace(/@\S+/, '@downloadURL')}`
          );
        }
      });
    }
  },
  messages: {
    includeDownloadURL:
      "If you are using 'updateURL', you must also use 'downloadURL'"
  },
  fixable: true
});
