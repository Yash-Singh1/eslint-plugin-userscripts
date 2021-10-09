const createValidator = require('../utils/createValidator');

const descriptionReg = /^description(:\S+)?$/;

module.exports = createValidator(
  'description',
  true,
  ({ attrVal, context }) => {
    let iteratedKeyNames = [];
    for (let attrValue of attrVal) {
      if (iteratedKeyNames.includes(attrValue.key)) {
        context.report({
          loc: attrValue.loc,
          messageId: 'multipleDescriptions'
        });
      } else {
        iteratedKeyNames.push(attrValue.key);
      }
    }
  },
  {
    multipleDescriptions: 'Include only one description for each language'
  },
  false,
  descriptionReg,
  true
);
