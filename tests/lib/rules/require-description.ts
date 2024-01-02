import requireDescription from '../../../lib/rules/require-description';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
ruleTester.run('require-description', requireDescription, {
  valid: [
    `// ==UserScript==
    // @description This is my description
    // ==/UserScript==`,
    `// ==UserScript==
    // @description This is my description
    // @description:en This is my second description
    // ==/UserScript==
    // more comments here`,
    `// ==UserScript==
    // @description This is my description
    // @description:en This is my second description
    // @description:es This is my third description in Spanish
    // ==/UserScript==
    // more comments here`
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
    // @name abc
    // ==/UserScript==`,
      options: ['required'],
      errors: [{ messageId: 'missingAttribute' }]
    },
    {
      code: `// ==UserScript==
      // @description This is my description
      // @description This is my second description
      // ==/UserScript==
      // more comments here`,
      errors: [{ messageId: 'multipleDescriptions' }]
    },
    {
      code: `// ==UserScript==
      // @description This is my description
      // @description:en This is my second description in English
      // @description:en This is my third description in English
      // ==/UserScript==
      // more comments here`,
      errors: [{ messageId: 'multipleDescriptions' }]
    }
  ]
});
