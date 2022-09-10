const rule = require('..')['use-download-and-update-url'];
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
ruleTester.run('use-download-and-update-url', rule, {
  valid: [
    `// ==UserScript==
    // @downloadURL example.com
    // @updateURL  example.com
    // ==/UserScript==`
  ],
  invalid: [
    {
      code: `// ==UserScript==
      // @downloadURL example.com
      // ==/UserScript==`,
      output: `// ==UserScript==
      // @downloadURL example.com
      // @updateURL example.com
      // ==/UserScript==`,
      errors: [
        {
          messageId: 'missingAttribute',
          data: { attribute: 'updateURL' }
        }
      ]
    },
    {
      code: `// ==UserScript==
      // @updateURL  example.com
      // ==/UserScript==`,
      output: `// ==UserScript==
      // @updateURL  example.com
      // @downloadURL  example.com
      // ==/UserScript==`,
      errors: [
        {
          messageId: 'missingAttribute',
          data: { attribute: 'downloadURL' }
        }
      ]
    }
  ]
});
