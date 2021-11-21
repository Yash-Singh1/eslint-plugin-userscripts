const createValidator = require('../utils/createValidator');
const compatMap = require('../data/compat-grant');
const Range = require('semver/classes/range');
const cleanupRange = require('../utils/cleanupRange');

// function cleanupRange(range) {
//   range.set = range.set.map((rangePart) =>
//     rangePart.map((comparator) => {
//       comparator.semver.version = cleanupVersion(comparator.semver.version);
//       return comparator;
//     })
//   );
//   return range;
// }

module.exports = createValidator({
  name: 'grant',
  required: false,
  validator: ({ attrVal, context }) => {
    if (!context.settings.userscriptVersions) {
      return;
    }

    const requestedGrant = attrVal.val;
    const allRequired =
      context.options[0] && context.options[0].requireAllCompatible;

    const supports = [];
    if (compatMap[requestedGrant]) {
      for (const versionConstraint in context.settings.userscriptVersions) {
        const foundAssertion = compatMap[requestedGrant].find(
          (constraint) => constraint.type === versionConstraint
        );
        supports.push(
          foundAssertion
            ? new Range(
                cleanupRange(
                  context.settings.userscriptVersions[versionConstraint]
                ),
                true
              ).intersects(
                new Range(cleanupRange(foundAssertion.versionConstraint), true)
              )
            : false
        );
      }
    }

    if (
      allRequired &&
      !supports.every((supportsIntersection) => supportsIntersection === true)
    ) {
      context.report({
        loc: {
          start: {
            line: attrVal.loc.start.line,
            column: 0
          },
          end: attrVal.loc.end
        },
        messageId: 'allNotSupportingCompatGrant',
        data: { requestedGrant }
      });
    } else if (
      (!allRequired &&
        supports.every(
          (supportsIntersection) => supportsIntersection === false
        )) ||
      !compatMap[requestedGrant]
    ) {
      context.report({
        loc: {
          start: {
            line: attrVal.loc.start.line,
            column: 0
          },
          end: attrVal.loc.end
        },
        messageId: 'noSupportingCompatGrant',
        data: { requestedGrant }
      });
    }
  },
  messages: {
    noSupportingCompatGrant:
      "None of your target versions support '{{ requestedGrant }}'",
    allNotSupportingCompatGrant:
      "All of your target versions don't support '{{ requestedGrant }}'"
  },
  schema: [
    {
      type: 'object',
      properties: {
        requireAllCompatible: {
          type: 'boolean',
          default: false
        }
      },
      default: {}
    }
  ]
});
