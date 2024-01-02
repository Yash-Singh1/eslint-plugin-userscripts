import { createValidator } from '../utils/createValidator';

const homepageAttrs = ['homepage', 'homepageURL'];

export default createValidator({
  name: homepageAttrs,

  validator: ({ attrVal, metadata, context, keyName }) => {
    const attribute = homepageAttrs.find(
      (homepageAttr) => homepageAttr !== keyName
    ) as string;
    if (!(attribute in metadata)) {
      context.report({
        loc: attrVal.loc,
        messageId: 'missingAttribute',
        data: {
          attribute: attribute
        },
        fix: function (fixer) {
          return fixer.insertTextAfterRange(
            attrVal.comment.range,
            `\n${context.sourceCode.lines[
              attrVal.comment.loc.start.line - 1
            ].replace(/^(\s*\/\/\s*@)\S*/, '$1' + attribute)}`
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
