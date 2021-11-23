const createValidator = require('../utils/createValidator');
const compatMap = require('../data/compat-headers');

// Documentation:
// - Tampermonkey: https://www.tampermonkey.net/documentation.php
// - Violentmonkey: https://violentmonkey.github.io/api/metadata-block/
// - Greasemonkey: https://wiki.greasespot.net/Metadata_Block
const validHeaders = new Set([
  ...Object.keys(compatMap.nonFunctional),
  ...Object.keys(compatMap.unlocalized)
]);
const internationalized = Object.keys(compatMap.localized).map(
  (item) => new RegExp(`^${item}(:\\S+)?$`)
);

module.exports = createValidator({
  name: 'headers',
  validator: ({ attrVal, context }) => {
    const optionsHeaders =
      context.options[0] && context.options[0].allowed
        ? new Set(context.options[0].allowed)
        : new Set();

    for (const value of attrVal) {
      const isValid =
        validHeaders.has(value.key) ||
        optionsHeaders.has(value.key) ||
        // use regex for internationalised headers
        internationalized.some((regex) => regex.test(value.key));

      if (!isValid) {
        context.report({
          loc: {
            start: {
              line: value.loc.start.line,
              column: 0
            },
            end: value.loc.end
          },
          messageId: 'invalidHeader',
          data: {
            header: `@${value.key}`
          }
        });
      }
    }
  },
  messages: {
    invalidHeader: "'{{ header }}' is not a valid userscript header"
  },
  regexMatch: /./, // match every header
  runOnce: true,
  schema: [
    {
      type: 'object',
      properties: {
        allowed: {
          type: 'array',
          default: []
        }
      },
      additionalProperties: false,
      default: {}
    }
  ]
});
