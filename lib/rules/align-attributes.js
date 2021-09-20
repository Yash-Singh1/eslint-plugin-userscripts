module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'aligns attributes in the metadata',
      category: 'Stylistic Issues'
    },
    schema: [
      {
        type: 'integer',
        minimum: 1,
        default: 2
      }
    ],
    messages: {
      spaceMetadata: 'The metadata is not spaced'
    },
    fixable: 'code'
  },
  create: (context) => {
    const spacing = context.options[0] || 2;

    const sourceCode = context.getSourceCode();
    const comments = sourceCode.getAllComments();

    let inMetadata = false;
    let done = false;
    let metadata = [];
    let start = {};
    let end = {};
    for (const comment of comments.filter(
      (comment) => comment.type === 'Line'
    )) {
      if (done) {
        continue;
      }

      // istanbul ignore else
      if (inMetadata && comment.value.trim() === '==/UserScript==') {
        end = comment.loc.end;
        done = true;
      } else if (!inMetadata && comment.value.trim() === '==UserScript==') {
        start = comment.loc.start;
        inMetadata = true;
      } else if (inMetadata && comment.value.trim().startsWith('@')) {
        metadata.push({
          key: comment.value.trim().slice(1).split(/\s/)[0],
          space: /^\S*(\s+)/.exec(comment.value.trim().slice(1))[1].length,
          line: comment.loc.start.line,
          comment
        });
      }
    }

    if (Object.keys(end).length === 0) {
      end = sourceCode.getLocFromIndex(sourceCode.getText().length);
    }

    if (metadata.length === 0) {
      return {};
    }

    const totalSpacing =
      Math.max(...metadata.map((metadatapoint) => metadatapoint.key.length)) +
      spacing;

    if (
      metadata.map((metadatapoint) => metadatapoint.space).sort()[0] <
        spacing ||
      metadata
        .map((metadatapoint) => metadatapoint.key.length + metadatapoint.space)
        .find((val) => val !== totalSpacing)
    ) {
      context.report({
        loc: {
          start,
          end
        },
        messageId: 'spaceMetadata',
        fix: function (fixer) {
          const fixerRules = [];
          for (const metadatapoint of metadata) {
            // istanbul ignore else
            if (
              metadatapoint.key.length + metadatapoint.space !==
              totalSpacing
            ) {
              const startColumn = /^(.*?@\S*)/.exec(
                sourceCode.getLines()[metadatapoint.line - 1]
              )[1].length;
              fixerRules.push(
                fixer.replaceTextRange(
                  [
                    sourceCode.getIndexFromLoc({
                      line: metadatapoint.line,
                      column: startColumn
                    }),
                    sourceCode.getIndexFromLoc({
                      line: metadatapoint.line,
                      column: startColumn + metadatapoint.space
                    })
                  ],
                  ' '.repeat(totalSpacing - metadatapoint.key.length)
                )
              );
            }
          }
          return fixerRules;
        }
      });
    }

    return {};
  }
};
