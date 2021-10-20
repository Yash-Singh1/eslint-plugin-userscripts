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
  'info',
  'deleteValue',
  'getValue',
  'listValues',
  'setValue',
  // remove when a newest version of VM is out
  // https://github.com/violentmonkey/violentmonkey/issues/1403
  'getResourceURL',
  'getResourceUrl',
  'notification',
  'openInTab',
  'registerMenuCommand',
  'setClipboard',
  'xmlHttpRequest', // note uppercase H
  // https://github.com/Yash-Singh1/eslint-plugin-userscripts/pull/17#issuecomment-947915169
  'cookie',
  'download'
].map((item) => `GM.${item}`);
const miscellaneous = [
  'none',
  'unsafeWindow',
  'window.close',
  'window.focus',
  'window.onurlchange'
];

const acceptable = new Set([...gmFunctions, ...greasemonkey, ...miscellaneous]);

module.exports = createValidator(
  'grant',
  false,
  ({ attrVal, context }) => {
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
  {
    grantHasInvalidArgument: "'{{ argument }}' is not a valid @grant argument"
  }
);
