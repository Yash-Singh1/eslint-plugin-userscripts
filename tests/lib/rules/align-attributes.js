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
      errors: [
        {
          messageId: 'spaceMetadata'
        }
      ],
      output: `// ==UserScript==
      // @name         hello
      // @description  hello again
      // ==/UserScript==`
    },
    {
      code: `// ==UserScript==
      // @name                  some name
      // @description hey there
      `,
      errors: [
        {
          messageId: 'spaceMetadata'
        }
      ],
      output: `// ==UserScript==
      // @name            some name
      // @description     hey there
      `,
      options: [5]
    }
  ]
});
