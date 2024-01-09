import requireVersion from '../../../lib/rules/require-version';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
ruleTester.run('require-version', requireVersion, {
  valid: [
    // Pulled from TamperMonkey examples https://www.tampermonkey.net/documentation.php#meta:version and others are alterations of those
    'Alpha-v1',
    'Alpha-v2',
    'Alpha-v10',
    '0.0.0',
    '000.0.1',
    '0.5preliminary',
    '0.6pre4',
    '1.00',
    '1.0.0',
    '1.-1',
    '1.',
    '1.1a',
    '1.1aa',
    '1.1ab',
    '1.1c',
    '1.10.0-alpha',
    '1.12+1.0',
    '1.1.1.1.2.0.1.1.1.1.1',

    // compare-versions tests
    '1.2.3a',
    '1.2.-3a',
    '1.0.x',
    '1.0.0-alpha-a.b-c-somethinglong+build.1-aef.1-its-okay',
    '1.2.3-SNAPSHOT-123',
    '1.2.3----RC-SNAPSHOT.12.9.1--.12+788',
    '1.0.0+0.build.1-rc.10000aaa-kk-0.1',
    '1.0.0-0A.is.legal',
    '1.1.2-prerelease+meta',

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
    '2023-09-11_14-0'
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
    },
    {
      code: `// ==UserScript==
      // @version 1.2.31.2.3----RC-SNAPSHOT.12.09.1--..12+788
      // ==/UserScript==`,
      errors: [{ messageId: 'invalidVersion' }]
    },
    {
      code: `// ==UserScript==
      // @version beta
      // ==/UserScript==`,
      errors: [{ messageId: 'invalidVersion' }]
    }
  ]
});
