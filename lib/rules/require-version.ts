import { createValidator } from '../utils/createValidator';

const versionRegex =
  /^(?=[\dA-Za-z–-]*\d[\dA-Za-z–-]*)[\dA-Za-z–-]+(\.[\dA-Za-z–-]+)*([+_]([\dA-Za-z-]+)(\.[\dA-Za-z-]+)*)?\.?\s*$/;

export default createValidator({
  name: 'version',
  required: true,
  validator: ({ attrVal, index, context }) => {
    if (index > 0) {
      context.report({
        loc: attrVal.loc,
        messageId: 'multipleVersions'
      });
    }

    const versionWhitespace = /^(\s*\/\/\s*)/.exec(
      context.sourceCode.lines[attrVal.comment.loc.start.line]
    )?.[1];
    if (versionWhitespace && !versionRegex.test(attrVal.val)) {
      context.report({
        loc: {
          start: {
            line: attrVal.loc.start.line,
            column: versionWhitespace.length - 1
          },
          end: attrVal.loc.end
        },
        messageId: 'invalidVersion'
      });
    }
  },
  messages: {
    multipleVersions: 'Include only one version',
    invalidVersion: 'Invalid version'
  }
});
