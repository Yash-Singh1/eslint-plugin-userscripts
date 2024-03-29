import type { Rule } from 'eslint';
import type { Position } from 'estree';
import { isNonNullishComment } from '../utils/comment';

export default {
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

    const sourceCode = context.sourceCode;
    const comments = sourceCode.getAllComments();

    let inMetadata = false;
    let done = false;
    const metadata: {
      key: string;
      space: number;
      line: number;
      comment: (typeof comments)[number];
    }[] = [];
    let start: Position | null = null;
    let end: Position | null = null;
    let maxLength: number = 0;
    let minSpace: number = Number.POSITIVE_INFINITY;

    for (const comment of comments) {
      if (done || comment.type !== 'Line' || !isNonNullishComment(comment)) {
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
        const spaceString = /^\S*(\s*)/.exec(commentValue.slice(1))?.[1];

        // Keys w/o value must not be validated
        if (!spaceString || spaceString.length === 0) {
          continue;
        }

        metadata.push({
          key: commentValue.slice(1).split(/\s/)[0],
          space: spaceString.length,
          line: comment.loc.start.line,
          comment
        });

        maxLength = Math.max(maxLength, metadata.at(-1)!.key.length);
        minSpace = Math.min(minSpace, metadata.at(-1)!.space);
      }
    }

    if (!end) {
      end = sourceCode.getLocFromIndex(sourceCode.getText().length);
    }

    if (metadata.length === 0) {
      return {};
    }

    const totalSpacing = maxLength + spacing;

    const hasSpaceLessThenSpacing = minSpace < spacing;

    if (
      start &&
      end &&
      (hasSpaceLessThenSpacing ||
        metadata.some(({ key, space }) => key.length + space !== totalSpacing))
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
                sourceCode.lines[metadatapoint.line - 1]
              )?.[1].length;

              // istanbul ignore if
              if (!startColumn) {
                continue;
              }

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
} satisfies Rule.RuleModule;
