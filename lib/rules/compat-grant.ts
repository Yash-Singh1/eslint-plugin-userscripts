import { createValidator } from '../utils/createValidator';
import { compatMap, gmPolyfillOverride } from '../data/compat-grant';
import { intersects } from 'semver';
import { cleanupRange } from '../utils/cleanupRange';
import type { VersionAssertion } from '../data/version-assertion';

export default createValidator({
  name: 'grant',
  required: false,
  validator: ({ attrVal, context }) => {
    if (!context.settings.userscriptVersions) {
      return;
    }

    const requestedGrant = attrVal.val;
    const allRequired: boolean =
      context.options[0] && context.options[0].requireAllCompatible;
    const overrides: typeof gmPolyfillOverride =
      context.settings.userscriptGrantCompatabilityOverrides || {};
    const gmPolyfill = context.options[0] && context.options[0].gmPolyfill;
    const gmPolyfillFallback =
      gmPolyfill && gmPolyfillOverride[requestedGrant]
        ? gmPolyfillOverride[requestedGrant]
        : compatMap[requestedGrant];

    if (overrides[requestedGrant] === 'ignore') {
      return;
    }

    const supports: boolean[] = [];

    function doesSupport(givenGrant: string) {
      let compatValue:
        | (typeof gmPolyfillOverride)[keyof typeof gmPolyfillOverride]
        | VersionAssertion[] =
        overrides[givenGrant] ||
        (gmPolyfill && gmPolyfillOverride[givenGrant]
          ? gmPolyfillOverride[givenGrant]
          : compatMap[givenGrant]);
      let compatVersions: VersionAssertion[] = Array.isArray(compatValue)
        ? compatValue
        : [];

      if (!compatValue || compatValue === 'ignore') {
        return;
      }

      if ('deps' in compatValue) {
        for (const overrideDep of compatValue.deps) {
          doesSupport(overrideDep);
        }
        if ('versions' in compatValue) {
          compatVersions = compatValue.versions as VersionAssertion[];
        } else {
          return;
        }
      }

      if (!Array.isArray(compatValue)) {
        if ('versions' in compatValue) {
          compatVersions = compatValue.versions as VersionAssertion[];
        } else {
          return;
        }
      }

      for (const versionConstraint in context.settings.userscriptVersions) {
        const foundAssertion = compatVersions.find(
          (constraint) => constraint.type === versionConstraint
        );
        const secondAssertionFound =
          compatMap[givenGrant] &&
          compatMap[givenGrant]!.find(
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
