const rule = require('..')['compat-grant'];
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
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
    },
    {
      code: `// ==UserScript==
  // @grant GM_getValue
  // ==/UserScript==`,
      options: [{ requireAllCompatible: true }],
      settings: {
        userscriptVersions: {
          tampermonkey: '*',
          greasemonkey: '*'
        }
      }
    },
    {
      code: `// ==UserScript==
// @grant GM.log
// ==/UserScript==`,
      options: [{ requireAllCompatible: true, gmPolyfill: true }],
      settings: {
        userscriptVersions: {
          violentmonkey: '*',
          tampermonkey: '*'
        }
      }
    },
    {
      code: `// ==UserScript==
// @grant GM.listValues
// ==/UserScript==`,
      options: [{ requireAllCompatible: true, gmPolyfill: true }],
      settings: {
        userscriptVersions: {
          violentmonkey: '*',
          tampermonkey: '*',
          greasemonkey: '*'
        }
      }
    },
    {
      code: `// ==UserScript==
// @grant GM.listValues
// ==/UserScript==`,
      options: [{ requireAllCompatible: true, gmPolyfill: false }],
      settings: {
        userscriptVersions: {
          violentmonkey: '*',
          tampermonkey: '*',
          greasemonkey: '*'
        },
        userscriptGrantCompatabilityOverrides: {
          'GM.listValues': 'ignore'
        }
      }
    },
    {
      code: `// ==UserScript==
// @grant GM.listValues
// ==/UserScript==`,
      options: [{ requireAllCompatible: true, gmPolyfill: false }],
      settings: {
        userscriptVersions: {
          violentmonkey: '*',
          tampermonkey: '*',
          greasemonkey: '*'
        },
        userscriptGrantCompatabilityOverrides: {
          'GM.listValues': {}
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
    },
    {
      code: `// ==UserScript==
// @grant GM.listValues
// ==/UserScript==`,
      options: [{ requireAllCompatible: true, gmPolyfill: false }],
      errors: [
        {
          messageId: 'allNotSupportingCompatGrant',
          data: { requestedGrant: 'GM.listValues' }
        }
      ],
      settings: {
        userscriptVersions: {
          violentmonkey: '>1',
          tampermonkey: '>1',
          greasemonkey: '>1'
        },
        userscriptGrantCompatabilityOverrides: {
          'GM.listValues': [
            { type: 'violentmonkey', versionConstraint: '<0.0.1' },
            { type: 'tampermonkey', versionConstraint: '<0.0.1' },
            { type: 'greasemonkey', versionConstraint: '<0.0.1' }
          ]
        }
      }
    },
    {
      code: `// ==UserScript==
// @grant GM.listValues
// ==/UserScript==`,
      options: [{ requireAllCompatible: true, gmPolyfill: false }],
      errors: [
        {
          messageId: 'allNotSupportingCompatGrant',
          data: { requestedGrant: 'GM.listValues' }
        }
      ],
      settings: {
        userscriptVersions: {
          violentmonkey: '>1',
          tampermonkey: '>1',
          greasemonkey: '>1'
        },
        userscriptGrantCompatabilityOverrides: {
          'GM.listValues': {
            versions: [
              { type: 'violentmonkey', versionConstraint: '<0.0.1' },
              { type: 'tampermonkey', versionConstraint: '<0.0.1' },
              { type: 'greasemonkey', versionConstraint: '<0.0.1' }
            ]
          }
        }
      }
    },
    {
      code: `// ==UserScript==
// @grant GM.listValues
// ==/UserScript==`,
      options: [{ requireAllCompatible: true, gmPolyfill: true }],
      errors: [
        {
          messageId: 'allNotSupportingCompatGrant',
          data: { requestedGrant: 'GM.listValues' }
        }
      ],
      settings: {
        userscriptVersions: {
          greasemonkey: '>4'
        },
        userscriptGrantCompatabilityOverrides: {
          'GM.listValues': {
            deps: ['GM_listValues'],
            versions: [{ type: 'greasemonkey', versionConstraint: '<4' }]
          }
        }
      }
    }
  ]
});
