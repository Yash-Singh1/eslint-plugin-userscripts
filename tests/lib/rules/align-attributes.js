var rule = require('..')['align-attributes'];
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('align-attributes', rule, {
  valid: [
    `// ==UserScript==
    // ==/UserScript==`,
    `// ==UserScript==
    // @name  hello
    // ==/UserScript==`,
    `// ==UserScript==
    // @name         hello
    // @description  hello also
    // ==/UserScript==`,
    {
      code: `// ==UserScript==
      // @name          hello
      // @description   hello again
      // ==/UserScript==`,
      options: [3]
    }
  ],
  invalid: [
    {
      code: `// ==UserScript==
      // @name          hello
      // @description   hello again
      // ==/UserScript==`,
      output: `// ==UserScript==
      // @name         hello
      // @description  hello again
      // ==/UserScript==`,
      errors: [
        {
          messageId: 'spaceMetadata'
        }
      ]
    },
    {
      code: `// ==UserScript==
      // @name                  some name
      // @description hey there
      `,
      output: `// ==UserScript==
      // @name            some name
      // @description     hey there
      `,
      options: [5],
      errors: [
        {
          messageId: 'spaceMetadata'
        }
      ]
    },
    {
      code: `// ==UserScript==
      // @name                  some name
      // @description hey there
      // ==/UserScript==
      // stuff
      `,
      output: `// ==UserScript==
      // @name            some name
      // @description     hey there
      // ==/UserScript==
      // stuff
      `,
      options: [5],
      errors: [
        {
          messageId: 'spaceMetadata'
        }
      ]
    }
  ]
});
