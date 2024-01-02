import noInvalidGrant from '../../../lib/rules/no-invalid-grant';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
ruleTester.run('no-invalid-grant', noInvalidGrant, {
  valid: [
    // "@grant" should not be detected if it's part of another header
    // indent using tabs
    `// ==UserScript==
    // @name		Test if @grant GM_doesNotExist works
    // @grant		GM_info
    // @grant		GM.info
    // @grant		GM_getValue
    // @grant		GM.getValue
    // @grant		GM_getResourceURL
    // @grant		GM.getResourceUrl
    // @grant		GM_xmlhttpRequest
    // @grant		GM.xmlHttpRequest
    // @grant		GM_download
    // @grant		GM.download
    // @grant		GM_cookie
    // @grant		GM.cookie
    // @grant		unsafeWindow
    // @grant		window.onurlchange
    // ==/UserScript==
    /* globals globalObj */`
  ],
  invalid: [
    {
      // one of the @grant values doesn't exist
      code: `// ==UserScript==
      // @grant  GM_doesNotExist
      // @grant  GM.doesNotExist
      // @grant  GM_notification
      // @grant  GM.getResourceURL
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
