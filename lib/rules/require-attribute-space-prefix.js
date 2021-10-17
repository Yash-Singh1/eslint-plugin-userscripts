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
      if (done) {
        continue;
      }

      if (
        inMetadata &&
        line.trim().startsWith('//') &&
        line.trim().slice(2).trim() === '==/UserScript=='
      ) {
        done = true;
      } else if (
        !inMetadata &&
        line.trim().startsWith('//') &&
        line.trim().slice(2).trim() === '==UserScript=='
      ) {
        inMetadata = true;
      } else if (
        inMetadata &&
        line.trim().startsWith('//') && // a comment
        !line.trim().startsWith('// ') && // that doesn't start with space
        line.trim().slice(2).trim() // and actually *contains* something other than spaces
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
