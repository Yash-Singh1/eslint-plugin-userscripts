import { createValidator } from '../utils/createValidator';
import { compatMap } from '../data/compat-headers';
import { intersects } from 'semver';
import { cleanupRange } from '../utils/cleanupRange';

export default createValidator({
  name: 'headers',
  description:
    'ensures compatibility across targeted userscript managers when using headers',
  required: false,
  validator: ({ attrVal, context }) => {
    if (!context.settings.userscriptVersions) {
      return;
    }

    const headerName = attrVal.key;
    const allRequired =
      context.options[0] && context.options[0].requireAllCompatible;

    const nonLocaleHeaderName = headerName.split(':')[0];

    let allVersionsSupport = true;
    let allVersionsDontSupport = true;

    if (
      headerName.includes(':') &&
      nonLocaleHeaderName in compatMap.localized
    ) {
      for (const versionConstraint in context.settings.userscriptVersions) {
        const foundAssertion = compatMap.localized[nonLocaleHeaderName]!.find(
          (constraint) => constraint.type === versionConstraint
        );
        const supported = foundAssertion
          ? intersects(
              cleanupRange(
                context.settings.userscriptVersions[versionConstraint]
              ),
              cleanupRange(foundAssertion.versionConstraint)
            )
          : false;
        if (supported) {
          allVersionsDontSupport = false;
        } else {
          allVersionsSupport = false;
        }
      }
    } else if (headerName in compatMap.unlocalized) {
      for (const versionConstraint in context.settings.userscriptVersions) {
        const foundAssertion = compatMap.unlocalized[headerName]!.find(
          (constraint) => constraint.type === versionConstraint
        );
        const supported = foundAssertion
          ? intersects(
              cleanupRange(
                context.settings.userscriptVersions[versionConstraint]
              ),
              cleanupRange(foundAssertion.versionConstraint),
              true
            )
          : false;
        if (supported) {
          allVersionsDontSupport = false;
        } else {
          allVersionsSupport = false;
        }
      }
    } else if (compatMap.nonFunctional[headerName]) {
      return;
    }

    if (allRequired && !allVersionsSupport) {
      context.report({
        loc: {
          start: {
            line: attrVal.loc.start.line,
            column: 0
          },
          end: attrVal.loc.end
        },
        messageId: 'allNotSupportingCompatHeader',
        data: { headerName }
      });
    } else if (
      (!allRequired && allVersionsDontSupport) ||
      !(
        headerName in compatMap.nonFunctional ||
        headerName in compatMap.unlocalized ||
        nonLocaleHeaderName in compatMap.localized
      )
    ) {
      context.report({
        loc: {
          start: {
            line: attrVal.loc.start.line,
            column: 0
          },
          end: attrVal.loc.end
        },
        messageId: 'noSupportingCompatHeader',
        data: { headerName }
      });
    }
  },
  messages: {
    noSupportingCompatHeader:
      "None of your target versions support '{{ headerName }}'",
    allNotSupportingCompatHeader:
      "All of your target versions don't support '{{ headerName }}'"
  },
  regexMatch: /./, // match every header
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
