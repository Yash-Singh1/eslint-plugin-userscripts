const rule = require('..')['require-download-url'];
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
ruleTester.run('require-download-url', rule, {
  valid: [
    `// ==UserScript==
    // @downloadURL example.com
    // @updateURL  example.com
    // ==/UserScript==`,
    `// ==UserScript==
      // @downloadURL example.com
      // ==/UserScript==`
  ],
  invalid: [
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
          messageId: 'includeDownloadURL'
        }
      ]
    }
  ]
});
