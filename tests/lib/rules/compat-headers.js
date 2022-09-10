const rule = require('..')['compat-headers'];
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
ruleTester.run('compat-headers', rule, {
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
// @webRequest [...]
// ==/UserScript==`,
    {
      code: `// ==UserScript==
// @name:blah  blah blah blah blah
// ==/UserScript==`,
      settings: {
        userscriptVersions: {
          tampermonkey: '*'
        }
      }
    },
    {
      code: `// ==UserScript==
// @match *
// @noframes
// ==/UserScript==`,
      options: [{ requireAllCompatible: true }],
      settings: {
        userscriptVersions: {
          violentmonkey: '>2.8',
          greasemonkey: '>2.4'
        }
      }
    },
    {
      code: `// ==UserScript==
// @antifeature we will steal your bank passwords
// ==/UserScript==`,
      options: [{ requireAllCompatible: true }],
      settings: {
        userscriptVersions: {
          violentmonkey: '*',
          tampermonkey: '*'
        }
      }
    },
    {
      code: `// ==UserScript==
// @antifeature we will steal your bank passwords
// ==/UserScript==`,
      settings: {
        userscriptVersions: {
          violentmonkey: '*',
          tampermonkey: '*'
        }
      }
    }
  ],
  invalid: [
    {
      code: `
    // ==UserScript==
    // @abc
    // ==/UserScript==
    `,
      errors: [
        {
          messageId: 'noSupportingCompatHeader',
          data: { headerName: 'abc' }
        }
      ],
      settings: {
        userscriptVersions: {}
      }
    },
    {
      code: `
    // ==UserScript==
    // @exclude-match *
    // ==/UserScript==
    `,
      errors: [
        {
          messageId: 'noSupportingCompatHeader',
          data: { headerName: 'exclude-match' }
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
    // @description:en-US my description for my super long description
    // ==/UserScript==
    `,
      options: [{ requireAllCompatible: true }],
      errors: [
        {
          messageId: 'allNotSupportingCompatHeader',
          data: { headerName: 'description:en-US' }
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
    // @abcd
    // ==/UserScript==
    `,
      options: [{ requireAllCompatible: true }],
      errors: [
        {
          messageId: 'noSupportingCompatHeader',
          data: { headerName: 'abcd' }
        }
      ],
      settings: {
        userscriptVersions: {
          greasemonkey: '*',
          tampermonkey: '*',
          violentmonkey: '*'
        }
      }
    },
    {
      code: `
    // ==UserScript==
    // @antifeature:en-US my description for my super long description
    // ==/UserScript==
    `,
      options: [{ requireAllCompatible: true }],
      errors: [
        {
          messageId: 'allNotSupportingCompatHeader',
          data: { headerName: 'antifeature:en-US' }
        }
      ],
      settings: {
        userscriptVersions: {
          tampermonkey: '*',
          violentmonkey: '*'
        }
      }
    }
  ]
});
