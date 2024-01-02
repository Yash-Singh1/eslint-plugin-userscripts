import useHomepageAndUrl from '../../../lib/rules/use-homepage-and-url';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
ruleTester.run('use-homepage-and-url', useHomepageAndUrl, {
  valid: [
    `// ==UserScript==
    // @homepage example.com
    // @homepageURL example.com
    // ==/UserScript==`
  ],
  invalid: [
    {
      code: `// ==UserScript==
      // @homepage example.com
      // ==/UserScript==`,
      output: `// ==UserScript==
      // @homepage example.com
      // @homepageURL example.com
      // ==/UserScript==`,
      errors: [
        {
          messageId: 'missingAttribute',
          data: { attribute: 'homepageURL' }
        }
      ]
    },
    {
      code: `// ==UserScript==
      // @homepageURL example.com
      // ==/UserScript==`,
      output: `// ==UserScript==
      // @homepageURL example.com
      // @homepage example.com
      // ==/UserScript==`,
      errors: [
        {
          messageId: 'missingAttribute',
          data: { attribute: 'homepage' }
        }
      ]
    }
  ]
});
