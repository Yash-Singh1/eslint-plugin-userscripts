var rule = require('..')['no-invalid-grant'];
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('no-invalid-grant', rule, {
  valid: [
    // "@grant" should not be detected if it's part of another header
    `// ==UserScript==
    // @name    Test if @grant GM_doesNotExist works
    // @grant   GM_info
    // @grant   GM.info
    // @grant   GM_getValue
    // @grant   GM.getValue
    // @grant   GM_getResourceURL
    // @grant   GM.getResourceURL
    // @grant   unsafeWindow
    // @grant   window.onurlchange
    // ==/UserScript==
    /* globals globalObj */`
  ],
  invalid: [
    {
      // one of the @grant values doesn't exist
      code: `// ==UserScript==
      // @grant GM_doesNotExist
      // @grant GM.doesNotExist
      // @grant GM_notification
      // ==/UserScript==`,
      errors: [
        {
          messageId: 'grantHasInvalidArgument',
          data: { argument: 'GM_doesNotExist' }
        },
        {
          messageId: 'grantHasInvalidArgument',
          data: { argument: 'GM.doesNotExist' }
        }
      ]
    },
    {
      code: `// ==UserScript==
      // @grant GM_notification text
      // ==/UserScript==`,
      errors: [
        {
          messageId: 'grantHasInvalidArgument',
          data: { argument: 'GM_notification text' }
        }
      ]
    }
  ]
});
