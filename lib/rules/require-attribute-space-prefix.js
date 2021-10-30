const parse = require('../utils/parse');

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'ensure atributes are prefixed by a space',
      category: 'Possible Errors'
    },
    messages: {
      attributeNotPrefixedBySpace: 'Attributes should be prefixed by a space'
    },
    schema: []
  },
  create: (context) => {
    const sourceCode = context.getSourceCode();

    const result = parse(sourceCode);

    for (const line of result.lines) {
      if (line.metadataInfo) {
        const trimmedLine = line.value.trim();
        if (
          trimmedLine.startsWith('//') &&
          trimmedLine.slice(2).trim().startsWith('@') &&
          // doesn't start with a space or starts with 2 spaces
          (!trimmedLine.startsWith('// ') || trimmedLine.startsWith('//  '))
        ) {
          context.report({
            loc: line.lineLoc,
            messageId: 'attributeNotPrefixedBySpace'
          });
        }
      }
    }

    return {};
  }
};
