import requireDownloadUrl from '../../../lib/rules/require-download-url';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
ruleTester.run('require-download-url', requireDownloadUrl, {
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
