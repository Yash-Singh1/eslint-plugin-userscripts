import { parse } from '../utils/parse';
import type { Rule } from 'eslint';
import type { NonNullishComment } from '../utils/comment';

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'ensure userscripts have valid metadata',
      category: 'Possible Errors'
    },
    messages: {
      metadataRequired: 'Add metadata to the userscript',
      moveMetadataToTop: 'Move the metadata to the top of the file',
      noClosingMetadata: 'Closing metadata comment not found',
      noCodeBetween: 'Code found between in metadata',
      attributeNotStartsWithAtTheRate: 'Attributes should begin with @'
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
    const sourceCode = context.sourceCode;

    const comments = sourceCode.getAllComments();

    const result = parse(sourceCode);

    for (const { lineLoc, codeBetween } of result.lines) {
      if (!codeBetween) {
        continue;
      }

      context.report({
        loc: lineLoc,
        messageId: 'noCodeBetween'
      });
    }

    for (const { lineLoc, invalid } of result.lines) {
      if (!invalid) {
        continue;
      }

      context.report({
        loc: lineLoc,
        messageId: 'attributeNotStartsWithAtTheRate'
      });
    }

    const startComment = comments.find(
      (comment) =>
        comment.value.trim() === '==UserScript==' && comment.type === 'Line'
    );
    if (
      startComment &&
      startComment.loc &&
      result.enteredMetadata !== -1 &&
      !result.end
    ) {
      context.report({
        loc: startComment.loc,
        messageId: 'noClosingMetadata'
      });
    }

    const firstComment = comments.find((comment) => {
      return comment.loc;
    }) as NonNullishComment | undefined;

    return {
      Program(node) {
        if (result.enteredMetadata === -1 || !firstComment) {
          context.report({
            node,
            messageId: 'metadataRequired'
          });
        } else if (
          (!context.options[0] ||
            !context.options[0].top ||
            context.options[0].top === 'required') &&
          (result.enteredMetadata !== 0 || firstComment.loc.start.line !== 1)
        ) {
          const firstStartComment = comments.find(
            (comment) =>
              comment.value.trim() === '==UserScript==' &&
              comment.type === 'Line'
          ) as NonNullishComment | undefined;

          if (firstStartComment) {
            context.report({
              loc: firstStartComment.loc,
              messageId: 'moveMetadataToTop'
            });
          } else {
            context.report({
              loc: firstComment.loc,
              messageId: 'moveMetadataToTop'
            });
          }
        }
      }
    };
  }
} satisfies Rule.RuleModule;
