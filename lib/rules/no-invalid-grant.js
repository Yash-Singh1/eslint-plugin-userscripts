const createValidator = require('../utils/createValidator');

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
  'addElement',
  'addStyle',
  'addValueChangeListener',
  'cookie',
  'deleteValue',
  'download',
  'getResourceText',
  'getResourceUrl', // note lowercase "rl"
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
  'xmlHttpRequest' // note uppercase "H"
].map((item) => `GM.${item}`);

const miscellaneous = [
  'none',
  'unsafeWindow',
  'window.close',
  'window.focus',
  'window.onurlchange'
];

const acceptable = new Set([...gmFunctions, ...greasemonkey, ...miscellaneous]);

module.exports = createValidator({
  name: 'grant',
  required: false,
  validator: ({ attrVal, context }) => {
    const argument = attrVal.val;

    if (!acceptable.has(argument)) {
      context.report({
        loc: {
          start: {
            line: attrVal.loc.start.line,
            column: 0
          },
          end: attrVal.loc.end
        },
        messageId: 'grantHasInvalidArgument',
        data: { argument }
      });
    }
  },
  messages: {
    grantHasInvalidArgument: "'{{ argument }}' is not a valid @grant argument"
  }
});
