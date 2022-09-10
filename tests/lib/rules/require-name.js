const rule = require('..')['require-name'];
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
ruleTester.run('require-name', rule, {
  valid: [
    `// ==UserScript==
    // @name This is my description
    // ==/UserScript==`
  ],
  invalid: [
    {
      code: `// ==UserScript==
    // @description abc
    // ==/UserScript==`,
      output: null,
      errors: [{ messageId: 'missingAttribute' }]
    },
    {
      code: `// ==UserScript==
      // @name This is my name
      // @name This is my second name
      // ==/UserScript==
      console.info(variable)
      debugger
      /* debugging above */`,
      output: null,
      errors: [{ messageId: 'multipleNames' }]
    },
    {
      code: `// ==UserScript==
      // @description This is my description
      // @name This is my name
      // ==/UserScript==`,
      output: `// ==UserScript==
      // @name This is my name
      // @description This is my description
      // ==/UserScript==`,
      errors: [{ messageId: 'nameAtBeginning' }]
    },
    {
      code: `// ==UserScript==
      // @description This is my description
      // @name:en This is my name
      // ==/UserScript==`,
      output: `// ==UserScript==
      // @name:en This is my name
      // @description This is my description
      // ==/UserScript==`,
      errors: [{ messageId: 'nameAtBeginning' }]
    },
    {
      code: `// ==UserScript==
      // @description This is my description
      // @name:en This is my name
      // @name:es This is my name
      // ==/UserScript==`,
      output: `// ==UserScript==
      // @name:en This is my name
      // @name:es This is my name
      // @description This is my description
      // ==/UserScript==`,
      errors: [{ messageId: 'nameAtBeginning' }]
    },
    {
      code: `// ==UserScript==
      // @description This is my description
      // @name:es This is my name
      // @name This is my name
      // ==/UserScript==`,
      output: `// ==UserScript==
      // @name This is my name
      // @name:es This is my name
      // @description This is my description
      // ==/UserScript==`,
      errors: [{ messageId: 'nameAtBeginning' }]
    },
    {
      code: `// ==UserScript==
      // @description This is my description
      // @name:es This is my name
      // @name:es This is my name
      // ==/UserScript==`,
      output: `// ==UserScript==
      // @name:es This is my name
      // @name:es This is my name
      // @description This is my description
      // ==/UserScript==`,
      errors: [{ messageId: 'nameAtBeginning' }, { messageId: 'multipleNames' }]
    },
    {
      code: `// ==UserScript==
      // @description This is my description
      // @name:es This is my name in Spanish
      // @name This is my name
      // @version 1.0.0
      // @name:en This is my name in English
      // ==/UserScript==`,
      output: `// ==UserScript==
      // @name This is my name
      // @name:es This is my name in Spanish
      // @name:en This is my name in English
      // @description This is my description
      // @version 1.0.0
      // ==/UserScript==`,
      errors: [{ messageId: 'nameAtBeginning' }]
    },
    {
      code: `// ==UserScript==
      // @description This is my description
      // @name:es This is my name in Spanish
      // @name This is my name
      // @version 1.0.0
      // @name:en This is my name in English`,
      output: `// ==UserScript==
      // @name This is my name
      // @name:es This is my name in Spanish
      // @name:en This is my name in English
      // @description This is my description
      // @version 1.0.0`,
      errors: [{ messageId: 'nameAtBeginning' }]
    },
    {
      code: `// ==UserScript==
      // @description This is my description
      // @description This is my description2
      // @name:es This is my name in Spanish
      // @name This is my name
      // @version 1.0.0
      // @name:en This is my name in English`,
      output: `// ==UserScript==
      // @name This is my name
      // @name:es This is my name in Spanish
      // @name:en This is my name in English
      // @description This is my description
      // @description This is my description2
      // @version 1.0.0`,
      errors: [{ messageId: 'nameAtBeginning' }]
    }
  ]
});
