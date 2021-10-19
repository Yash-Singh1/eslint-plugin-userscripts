module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'ensure @grant has a valid argument',
      category: 'Possible Errors'
    },
    messages: {
      grantHasInvalidArgument:
        "'{{ argument }}' is not a valid argument for @grant"
    },
    schema: []
  },
  create: (context) => {
    // Documentation:
    // - Tampermonkey: https://www.tampermonkey.net/documentation.php#_grant
    // - Violentmonkey: https://violentmonkey.github.io/api/gm
    // - Greasemonkey: https://wiki.greasespot.net/Greasemonkey_Manual:API
    const gmFunctions = [
      'addElement',
      'addStyle',
      'addValueChangeListener',
      'cookie',
      'deleteValue',
      'download',
      'getResourceText',
      'getResourceURL',
      'getTab',
      'getTabs',
      'getValue',
      'info',
      'listValues',
      'log',
      'notification',
      'openInTab',
      'registerMenuCommand',
      'removeValueChangeListener',
      'saveTab',
      'setClipboard',
      'setValue',
      'unregisterMenuCommand',
      'xmlhttpRequest'
    ].map((item) => `GM_${item}`);
    const greasemonkey = [
      'info',
      'deleteValue',
      'getValue',
      'listValues',
      'setValue',
      'getResourceUrl',
      'notification',
      'openInTab',
      'registerMenuCommand',
      'setClipboard',
      'xmlHttpRequest' // note uppercase H
    ].map((item) => `GM.${item}`);
    const miscellaneous = [
      'none',
      'unsafeWindow',
      'window.close',
      'window.focus',
      'window.onurlchange'
    ];

    const acceptable = new Set([
      ...gmFunctions,
      ...greasemonkey,
      ...miscellaneous
    ]);

    const sourceCode = context.getSourceCode();
    const lines = sourceCode.lines;

    let inMetadata = false;
    let done = false;
    for (const [index, line] of lines.entries()) {
      if (done) break;

      const trimmed = line.trim();
      const isComment = trimmed.startsWith('//');

      const lineWithoutSlashes = line.trim().slice(2).trim();
      const isOpeningMetadata = lineWithoutSlashes === '==UserScript==';
      const isClosingMetadata = lineWithoutSlashes === '==/UserScript==';

      const isGrant = lineWithoutSlashes.startsWith('@grant');
      const grantArgument = lineWithoutSlashes.slice(6).trim();
      const isArgumentValid = acceptable.has(grantArgument);

      if (
        !inMetadata && // not in metadata
        isComment &&
        isOpeningMetadata // and the metadata starts here
      ) {
        inMetadata = true;
      } else if (
        inMetadata &&
        isComment &&
        isClosingMetadata // end of metadata
      ) {
        done = true;
      } else if (
        inMetadata &&
        isComment &&
        isGrant && // a "// @grant ..." line
        !isArgumentValid // where the argument is invalid
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
          messageId: 'grantHasInvalidArgument',
          data: {
            argument: grantArgument
          }
        });
      }
    }

    return {};
  }
};
