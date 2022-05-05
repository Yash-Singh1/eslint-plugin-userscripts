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

      const commentValue = comment.value.trim();

      // istanbul ignore else
      if (inMetadata && commentValue === '==/UserScript==') {
        end = comment.loc.end;
        done = true;
      } else if (!inMetadata && commentValue === '==UserScript==') {
        start = comment.loc.start;
        inMetadata = true;
      } else if (inMetadata && commentValue.startsWith('@')) {
        // Get space string between key and value
        const [, spaceString] = /^\S*(\s*)/.exec(commentValue.slice(1));

        // Keys w/o value must not be validated
        if (spaceString.length === 0) {
          continue;
        }

        metadata.push({
          key: commentValue.slice(1).split(/\s/)[0],
          space: spaceString.length,
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
      Math.max(...metadata.map(({ key }) => key.length)) + spacing;

    const hasSpaceLessThenSpacing =
      metadata.map(({ space }) => space).sort()[0] < spacing;

    if (
      hasSpaceLessThenSpacing ||
      metadata
        .map(({ key, space }) => key.length + space)
        .some((val) => val !== totalSpacing)
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
