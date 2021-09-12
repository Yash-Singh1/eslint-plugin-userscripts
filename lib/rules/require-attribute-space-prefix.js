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
    schema: [
      {
        type: 'object',
        properties: {
          top: {
            enum: ['required', 'optional'],
            default: 'required'
          }
        },
        additionalProperties: false
      }
    ]
  },
  create: (context) => {
    const sourceCode = context.getSourceCode();

    const comments = sourceCode.getAllComments();
    const lines = sourceCode.lines;

    let inMetadata = false;
    let done = false;
    lines.forEach((line, index) => {
      if (done) {
        return;
      }

      const lineLoc = {
        start: {
          line: index + 1,
          column: 0
        },
        end: {
          line: index + 1,
          column: line.length
        }
      };

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
          } else if (inMetadata && line.trim().startsWith('//') && !line.trim().startsWith('// ')) {
          context.report({
            loc: lineLoc,
            messageId: 'attributeNotPrefixedBySpace'
          });
        }
      });

      return {};
    }
  };
