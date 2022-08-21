const createValidator = require('../utils/createValidator');
const { compatMap, gmPolyfillOverride } = require('../data/compat-grant');
const { intersects } = require('semver');
const cleanupRange = require('../utils/cleanupRange');

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
    const overrides =
      context.settings.userscriptGrantCompatabilityOverrides || {};
    const gmPolyfill = context.options[0] && context.options[0].gmPolyfill;
    const gmPolyfillFallback =
      gmPolyfill && gmPolyfillOverride[requestedGrant]
        ? gmPolyfillOverride[requestedGrant]
        : compatMap[requestedGrant];

    if (overrides[requestedGrant] === 'ignore') {
      return;
    }

    const supports = [];

    function doesSupport(givenGrant) {
      let compatValue =
        overrides[givenGrant] ||
        (gmPolyfill && gmPolyfillOverride[givenGrant]
          ? gmPolyfillOverride[givenGrant]
          : compatMap[givenGrant]);

      console.log(
        requestedGrant,
        givenGrant,
        gmPolyfill,
        gmPolyfillFallback,
        compatValue
      );

      if (compatValue === 'ignore') {
        return;
      }
      if (compatValue.deps) {
        for (const overrideDep of compatValue.deps) {
          doesSupport(overrideDep);
        }
        if (compatValue.versions) {
          compatValue = compatValue.versions;
        } else {
          return;
        }
      }

      if (!Array.isArray(compatValue)) {
        if (compatValue.versions) {
          compatValue = compatValue.versions;
        } else {
          return;
        }
      }

      for (const versionConstraint in context.settings.userscriptVersions) {
        const foundAssertion = compatValue.find(
          (constraint) => constraint.type === versionConstraint
        );
        const secondAssertionFound =
          compatMap[givenGrant] &&
          compatMap[givenGrant].find(
            (constraint) => constraint.type === versionConstraint
          );
        supports.push(
          (foundAssertion
            ? intersects(
                cleanupRange(
                  context.settings.userscriptVersions[versionConstraint]
                ),
                cleanupRange(foundAssertion.versionConstraint),
                true
              )
            : false) ||
            (gmPolyfill &&
            gmPolyfillOverride[givenGrant] &&
            secondAssertionFound
              ? intersects(
                  cleanupRange(
                    context.settings.userscriptVersions[versionConstraint]
                  ),
                  cleanupRange(secondAssertionFound.versionConstraint),
                  true
                )
              : false)
        );
      }
    }

    if (overrides[requestedGrant] || gmPolyfillFallback) {
      console.log(requestedGrant);
      doesSupport(requestedGrant);
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
      (!gmPolyfillFallback && !overrides[requestedGrant])
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
        },
        gmPolyfill: {
          type: 'boolean',
          default: false
        }
      },
      default: {}
    }
  ]
});
