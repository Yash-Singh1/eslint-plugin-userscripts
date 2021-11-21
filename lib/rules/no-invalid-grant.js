const createValidator = require('../utils/createValidator');
const compatMap = require('../data/compat-grant');

module.exports = createValidator({
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
