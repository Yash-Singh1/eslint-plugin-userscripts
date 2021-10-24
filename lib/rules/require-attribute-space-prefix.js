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

    const lines = sourceCode.lines;

    let inMetadata = false;
    let done = false;
    for (const [index, line] of lines.entries()) {
      if (done) continue;

      const trimmedLine = line.trim();

      if (
        inMetadata &&
        trimmedLine.startsWith('//') &&
        trimmedLine.slice(2).trim() === '==/UserScript=='
      ) {
        done = true;
      } else if (
        !inMetadata &&
        trimmedLine.startsWith('//') &&
        trimmedLine.slice(2).trim() === '==UserScript=='
      ) {
        inMetadata = true;
      } else if (
        inMetadata &&
        trimmedLine.startsWith('//') &&
        trimmedLine.slice(2).trim().startsWith('@') &&
        // doesn't start with a space or starts with 2 spaces
        (!trimmedLine.startsWith('// ') || trimmedLine.startsWith('//  '))
      ) {
        context.report({
          loc: {
            start: {
              line: index + 1,
              column: 0
            },
            end: {
              line: index + 1,
              column: line.length
            }
          },
          messageId: 'attributeNotPrefixedBySpace'
        });
      }
    }

    return {};
  }
};
