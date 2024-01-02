import { createValidator } from '../utils/createValidator';
import { compatMap } from '../data/compat-grant';

export default createValidator({
  name: 'grant',
  required: false,
  validator: ({ attrVal, context }) => {
    const argument = attrVal.val;

    if (!Object.keys(compatMap).includes(argument)) {
      context.report({
        loc: {
          start: {
            line: attrVal.loc.start.line,
            column: 0
          },
          end: attrVal.loc.end
        },
        messageId: 'grantHasInvalidArgument',
        data: { argument }
      });
    }
  },
  messages: {
    grantHasInvalidArgument: "'{{ argument }}' is not a valid @grant argument"
  }
});
