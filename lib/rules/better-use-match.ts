import { createValidator } from '../utils/createValidator';

export default createValidator({
  name: 'include',
  required: false,
  validator: ({ attrVal, context }) => {
    context.report({
      loc: {
        start: {
          line: attrVal.loc.start.line,
          column: 0
        },
        end: attrVal.loc.end
      },
      messageId: 'betterUseMatch'
    });
  },
  messages: {
    betterUseMatch:
      'Using @include is potentially unsafe and may be obsolete in Manifest v3 in early 2023. Please switch to @match.'
  }
});
