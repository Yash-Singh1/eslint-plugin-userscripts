import { createValidator } from '../utils/createValidator';

const descriptionReg = /^description(:\S+)?$/;

export default createValidator({
  name: 'description',
  required: true,
  validator: ({ attrVal, context }) => {
    const iteratedKeyNames: string[] = [];
    for (const attrValue of attrVal) {
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
  messages: {
    multipleDescriptions: 'Include only one description for each language'
  },
  regexMatch: descriptionReg,
  runOnce: true
});
