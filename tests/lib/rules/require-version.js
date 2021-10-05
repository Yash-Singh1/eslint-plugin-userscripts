var rule = require('..')['require-version'];
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('require-version', rule, {
  valid: [
    `// ==UserScript==
    // @version 1.0.0
    // ==/UserScript==`
  ],
  invalid: [
    {
      code: `// ==UserScript==
    // @description abc
    // ==/UserScript==`,
      errors: [{ messageId: 'missingAttribute' }]
    },
    {
      code: `// ==UserScript==
    // @description abc
    // ==/UserScript==`,
      options: ['required'],
      errors: [{ messageId: 'missingAttribute' }]
    },
    {
      code: `// ==UserScript==
      // @version 2.4.5
      // @version 2.4.5
      // ==/UserScript==`,
      errors: [{ messageId: 'multipleVersions' }]
    },
    {
      code: `// ==UserScript==
      // @version .5.6
      // ==/UserScript==`,
      errors: [{ messageId: 'invalidVersion' }]
    },
    {
      code: `// ==UserScript==
      // @version 5.6.
      // ==/UserScript==`,
      errors: [{ messageId: 'invalidVersion' }]
    },
    {
      code: `// ==UserScript==
      // @version 5 .6
      // ==/UserScript==`,
      errors: [{ messageId: 'invalidVersion' }]
    },
    {
      code: `// ==UserScript==
      // @version 0.0.0
      // ==/UserScript==`,
      errors: [{ messageId: 'invalidVersion' }]
    },
    {
      code: `// ==UserScript==
      // @version 0
      // ==/UserScript==`,
      errors: [{ messageId: 'invalidVersion' }]
    }
  ]
});
