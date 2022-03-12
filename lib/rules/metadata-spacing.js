const parse = require('../utils/parse');

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'ensure there is a newline between the metadata and the code',
      category: 'Best Practices'
    }
  },
  create: (context) => {
    const sourceCode = context.getSourceCode();
    const result = parse(sourceCode);

    if (
      result.enteredMetadata !== -1 &&
      result.end &&
      sourceCode.lines.length !==
        result.lines[result.lines.length - 1].lineLoc.end.line &&
      sourceCode.lines[
        result.lines[result.lines.length - 1].lineLoc.end.line
      ].trim().length > 0
    ) {
      context.report({
        message: 'There should be a newline between the metadata and the code',
        loc: result.lines[result.lines.length - 1].lineLoc
      });
    }

    return {};
  }
};
