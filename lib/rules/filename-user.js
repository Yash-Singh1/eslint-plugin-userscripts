module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'ensure userscripts end with .user.js',
      category: 'Best Practices'
    },
    schema: [
      {
        enum: ['always', 'never']
      }
    ],
    messages: {
      filenameExtension: "Rename '{{ oldFilename }}' to '{{ newFilename }}'"
    }
  },
  create: (context) => {
    const fileName = context.getFilename();

    if (fileName === '<input>' || fileName === '<text>') {
      return {};
    }

    return {
      Program() {
        if (
          (!fileName.endsWith('.user.js') &&
            (!context.options[0] || context.options[0] === 'always')) ||
          (fileName.endsWith('.user.js') && context.options[0] === 'never')
        ) {
          context.report({
            loc: { column: 0, line: 1 },
            messageId: 'filenameExtension',
            data: {
              newFilename: fileName.replace(
                context.options[0] === 'always' ? /.js$/ : /.user.js$/,
                context.options[0] === 'always' ? '.user.js' : '.js'
              ),
              oldFilename: fileName
            }
          });
        }
      }
    };
  }
};
