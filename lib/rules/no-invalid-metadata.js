const parse = require('../utils/parse');

module.exports = {
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
    const sourceCode = context.getSourceCode();

    const comments = sourceCode.getAllComments();

    const result = parse(sourceCode);

    for (const lineLoc of result.lines.filter((line) => line.codeBetween))
      context.report({
        loc: lineLoc,
        messageId: 'noCodeBetween'
      });

    for (const lineLoc of result.lines.filter((line) => line.invalid))
      context.report({
        loc: lineLoc,
        messageId: 'attributeNotStartsWithAtTheRate'
      });

    if (result.enteredMetadata !== -1 && !result.end) {
      context.report({
        loc: comments.find(
          (comment) =>
            comment.value.trim() === '==UserScript==' && comment.type === 'Line'
        ).loc,
        messageId: 'noClosingMetadata'
      });
    }

    return {
      Program(node) {
        if (result.enteredMetadata === -1) {
          context.report({
            node,
            messageId: 'metadataRequired'
          });
        } else if (
          (!context.options[0] ||
            !context.options[0].top ||
            context.options[0].top === 'required') &&
          (result.enteredMetadata !== 0 || comments[0].loc.start.line !== 1)
        ) {
          context.report({
            loc: comments.find(
              (comment) =>
                comment.value.trim() === '==UserScript==' &&
                comment.type === 'Line'
            ).loc,
            messageId: 'moveMetadataToTop'
          });
        }
      }
    };
  }
};
