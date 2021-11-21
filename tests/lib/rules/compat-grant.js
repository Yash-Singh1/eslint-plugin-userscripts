var rule = require('..')['compat-grant'];
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('compat-grant', rule, {
  valid: [
    `// ==UserScript==
// @grant         GM.openInTab
// @grant         GM_openInTab
// @downloadURL   example.com
// ==/UserScript==

/* My code adapted for async and sync openInTab */
`,
    ``,
    `// ==UserScript==
// @grant example.com
// ==/UserScript==`,
    {
      code: `// ==UserScript==
// @grant GM.log
// ==/UserScript==`,
      settings: {
        userscriptVersions: {
          tampermonkey: '*'
        }
      }
    },
    {
      code: `// ==UserScript==
// @grant GM.log
// ==/UserScript==`,
      options: [{ requireAllCompatible: true }],
      settings: {
        userscriptVersions: {
          tampermonkey: '*',
          greasemonkey: '*'
        }
      }
    }
  ],
  invalid: [
    {
      code: `
    // ==UserScript==
    // @grant example.com
    // ==/UserScript==
    `,
      errors: [
        {
          messageId: 'noSupportingCompatGrant',
          data: { requestedGrant: 'example.com' }
        }
      ],
      settings: {
        userscriptVersions: {}
      }
    },
    {
      code: `
    // ==UserScript==
    // @grant window.close
    // ==/UserScript==
    `,
      errors: [
        {
          messageId: 'noSupportingCompatGrant',
          data: { requestedGrant: 'window.close' }
        }
      ],
      settings: {
        userscriptVersions: {
          tampermonkey: '<=1.0.0.0',
          violentmonkey: '<2.5'
        }
      }
    },
    {
      code: `
    // ==UserScript==
    // @grant randomUnrealGrant
    // ==/UserScript==
    `,
      options: [{ requireAllCompatible: true }],
      errors: [
        {
          messageId: 'noSupportingCompatGrant',
          data: { requestedGrant: 'randomUnrealGrant' }
        }
      ],
      settings: {
        userscriptVersions: {
          tampermonkey: '<=1.0.0.0',
          violentmonkey: '<2.5'
        }
      }
    },
    {
      code: `
    // ==UserScript==
    // @grant window.focus
    // ==/UserScript==
    `,
      errors: [
        {
          messageId: 'noSupportingCompatGrant',
          data: { requestedGrant: 'window.focus' }
        }
      ],
      settings: {
        userscriptVersions: {
          greasemonkey: '*'
        }
      }
    },
    {
      code: `// ==UserScript==
// @grant GM.log
// ==/UserScript==`,
      options: [{ requireAllCompatible: true }],
      errors: [
        {
          messageId: 'allNotSupportingCompatGrant',
          data: { requestedGrant: 'GM.log' }
        }
      ],
      settings: {
        userscriptVersions: {
          violentmonkey: '*',
          tampermonkey: '*'
        }
      }
    }
  ]
});
