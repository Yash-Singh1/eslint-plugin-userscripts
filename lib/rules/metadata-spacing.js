const parse = require('../utils/parse');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'ensure there is a newline between the metadata and the code',
      category: 'Best Practices'
    },
    fixable: 'whitespace'
  },
  create: (context) => {
    const sourceCode = context.getSourceCode();
    const result = parse(sourceCode);

    const hasMetadata = result.enteredMetadata !== -1 && result.end;

    if (!hasMetadata) {
      return {};
    }

    const metadataLastLineLoc = result.lines[result.lines.length - 1].lineLoc;

    const hasCodeOtherThanMetadata =
      sourceCode.lines.length !== metadataLastLineLoc.end.line;

    if (!hasCodeOtherThanMetadata) {
      return {};
    }

    const lineNextToMetadata = sourceCode.lines[metadataLastLineLoc.end.line];

    if (lineNextToMetadata.trim().length > 0) {
      context.report({
        message: 'There should be a newline between the metadata and the code',
        loc: metadataLastLineLoc,
        fix: function (fixer) {
          const range = [
            sourceCode.getIndexFromLoc(metadataLastLineLoc.start),
            sourceCode.getIndexFromLoc(metadataLastLineLoc.end)
          ];

          return fixer.insertTextAfterRange(range, '\n');
        }
      });
    }

    return {};
  }
};
