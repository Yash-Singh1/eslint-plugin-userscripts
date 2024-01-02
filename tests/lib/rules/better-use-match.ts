import betterUseMatch from '../../../lib/rules/better-use-match';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
ruleTester.run('better-use-match', betterUseMatch, {
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
