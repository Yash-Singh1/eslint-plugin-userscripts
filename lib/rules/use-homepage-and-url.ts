import { createValidator } from '../utils/createValidator';

const homepageAttrs = ['homepage', 'homepageURL'];

export default createValidator({
  name: homepageAttrs,

  validator: ({ attrVal, metadata, context, keyName }) => {
    const attribute =
      homepageAttrs[0] === keyName ? homepageAttrs[1] : homepageAttrs[0];

    if (!(attribute in metadata)) {
      context.report({
        loc: attrVal.loc,
        messageId: 'missingAttribute',
        data: {
          attribute
        },
        fix: function (fixer) {
          return fixer.insertTextAfterRange(
            attrVal.comment.range,
            `\n${context.sourceCode.lines
              .at(attrVal.comment.loc.start.line - 1)!
              .replace(/@\S+/, `@${attribute}`)}`
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
