var rule = require('..')['require-description'];
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('require-description', rule, {
  valid: [
    `// ==UserScript==
    // @description This is my description
    // ==/UserScript==`
  ],
  invalid: [
    {
      code: `// ==UserScript==
    // @name abc
    // ==/UserScript==`,
      errors: [{ messageId: 'missingAttribute' }]
    },
    {
      code: `// ==UserScript==
      // @description This is my description
      // @description This is my second description
      // ==/UserScript==`,
      errors: [{ messageId: 'multipleDescriptions' }]
    }
  ]
});
