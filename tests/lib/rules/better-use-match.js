var rule = require('..')['better-use-match'];
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('better-use-match', rule, {
  valid: [
    `// ==UserScript==
    // @description This is my description
    // @match *://*/*
    // ==/UserScript==`
  ],
  invalid: [
    {
      code: `// ==UserScript==
      // @include *://*/*
      // ==/UserScript==`,
      errors: [{ messageId: 'betterUseMatch' }]
    }
  ]
});
