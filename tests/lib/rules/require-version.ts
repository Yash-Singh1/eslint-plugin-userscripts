import requireVersion from '../../../lib/rules/require-version';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
ruleTester.run('require-version', requireVersion, {
  valid: [
    'Alpha-v1',
    '0.0.0',
    '000.0.1',
    '0.6pre4',
    '1.00',
    '1.0.0',
    '1.-1',
    '1.',
    '1.1a',
    '1.1.1.1.2.0.1.1.1.1.1',

    // https://semver.org/#spec-item-9,
    '1.0.0-alpha',
    '1.0.0-alpha.1',
    '1.0.0-0.3.7',
    '1.0.0-x.7.z.92',
    '1.0.0-x-y-z.–',

    // https://semver.org/#spec-item-10
    '1.0.0-alpha+001',
    '1.0.0+20130313144700',
    '1.0.0-beta+exp.sha.5114f85',

    // https://www.tampermonkey.net/changelog.php#v5.0.0:~:text=Refactored%20version%20number%20parser%20to%20support%20ISO%20format%20dates
    '2023-08-17.alpha',
    '2023-08-17',
    '2023-08-17_14-04',
    '2023-08-17_14-04.0',
    '2023-08-17+alpha',
    '2023-09-11_14-0',
  ].map(
    (version) => `// ==UserScript==
                    // @version ${version}
                    // ==/UserScript==`
  ),
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
      // @version 5 .6
      // ==/UserScript==`,
      errors: [{ messageId: 'invalidVersion' }]
    },
    {
      code: `// ==UserScript==
      // @version @.€.$
      // ==/UserScript==`,
      errors: [{ messageId: 'invalidVersion' }]
    }
  ]
});
