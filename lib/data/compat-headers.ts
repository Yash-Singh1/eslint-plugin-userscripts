import { CompatMap } from './version-assertion';

// Documentation:
// - Adguard: https://adguard.com/kb/general/extensions/#development
// - Tampermonkey: https://www.tampermonkey.net/documentation.php
// - Violentmonkey: https://violentmonkey.github.io/api/metadata-block/
// - Greasemonkey: https://wiki.greasespot.net/Metadata_Block
export const compatMap: {
  localized: CompatMap;
  unlocalized: CompatMap;
  nonFunctional: CompatMap;
} = {
  localized: {
    name: [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'tampermonkey', versionConstraint: '>=3.9' },
      { type: 'violentmonkey', versionConstraint: '>=2.1.6.8' },
      { type: 'greasemonkey', versionConstraint: '>=2.2 <4 || >=4.11' }
    ],
    description: [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'tampermonkey', versionConstraint: '>=3.9' },
      { type: 'violentmonkey', versionConstraint: '>=2.1.6.8' },
      { type: 'greasemonkey', versionConstraint: '>=2.2 <4 || >=4.11' }
    ],
    antifeature: [
      { type: 'tampermonkey', versionConstraint: '>=4.12' },
      { type: 'violentmonkey', versionConstraint: '>=2.12.10' }
    ]
  },
  unlocalized: {
    include: [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'tampermonkey', versionConstraint: '*' },
      { type: 'violentmonkey', versionConstraint: '*' },
      { type: 'greasemonkey', versionConstraint: '*' }
    ],
    exclude: [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'tampermonkey', versionConstraint: '*' },
      { type: 'violentmonkey', versionConstraint: '*' },
      { type: 'greasemonkey', versionConstraint: '*' }
    ],
    'exclude-match': [{ type: 'violentmonkey', versionConstraint: '>=2.6.2' }],
    version: [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'tampermonkey', versionConstraint: '*' },
      { type: 'violentmonkey', versionConstraint: '*' },
      { type: 'greasemonkey', versionConstraint: '>=0.9.0' }
    ],
    'run-at': [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'tampermonkey', versionConstraint: '>=1.1.2190' },
      { type: 'violentmonkey', versionConstraint: '*' },
      { type: 'greasemonkey', versionConstraint: '>=0.9.8' }
    ],
    'run-in': [
      // 5.3.6209 beta
      { type: 'tampermonkey', versionConstraint: '>=5.3' }
    ],
    resource: [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'tampermonkey', versionConstraint: '*' },
      { type: 'violentmonkey', versionConstraint: '*' },
      { type: 'greasemonkey', versionConstraint: '>=0.8.20080609.0' }
    ],
    require: [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'tampermonkey', versionConstraint: '*' },
      { type: 'violentmonkey', versionConstraint: '*' },
      { type: 'greasemonkey', versionConstraint: '>=0.8.20080609.0' }
    ],
    match: [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'tampermonkey', versionConstraint: '>=1.1.2190' },
      { type: 'violentmonkey', versionConstraint: '*' },
      { type: 'greasemonkey', versionConstraint: '>=0.9.8' }
    ],
    'user-agent': [{ type: 'tampermonkey', versionConstraint: '>=2.8.2894' }],
    unwrap: [
      { type: 'greasemonkey', versionConstraint: '0.8.1 - 0.9.22' },
      { type: 'tampermonkey', versionConstraint: '>=4.14' },
      { type: 'violentmonkey', versionConstraint: '>=2.13.0.16' }
    ],
    grant: [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'tampermonkey', versionConstraint: '>=3.0.3389' },
      { type: 'violentmonkey', versionConstraint: '>=2.1.6.1' },
      { type: 'greasemonkey', versionConstraint: '>=1' }
    ],
    noframes: [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'violentmonkey', versionConstraint: '>=2.8.17' },
      { type: 'greasemonkey', versionConstraint: '>=2.3' },
      { type: 'tampermonkey', versionConstraint: '>=2.0.2355' }
    ],
    connect: [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'tampermonkey', versionConstraint: '>=4.0' },
      { type: 'violentmonkey', versionConstraint: '>=2.12.10' }
    ],
    webRequest: [{ type: 'tampermonkey', versionConstraint: '>=4.4' }],
    'inject-into': [{ type: 'violentmonkey', versionConstraint: '>=2.10.0' }],
    domain: [], // Scriptish
    nocompat: [{ type: 'tampermonkey', versionConstraint: '>=2.4.2683' }],
    namespace: [
      { type: 'tampermonkey', versionConstraint: '*' },
      { type: 'violentmonkey', versionConstraint: '*' },
      { type: 'greasemonkey', versionConstraint: '>=0.2.5' }
    ],
    sandbox: [{ type: 'tampermonkey', versionConstraint: '>=4.18' }],
    'top-level-await': [
      { type: 'violentmonkey', versionConstraint: '>=2.19.2' }
    ]
  },
  nonFunctional: {
    name: [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'tampermonkey', versionConstraint: '*' },
      { type: 'violentmonkey', versionConstraint: '*' },
      { type: 'greasemonkey', versionConstraint: '*' }
    ],
    description: [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'tampermonkey', versionConstraint: '*' },
      { type: 'violentmonkey', versionConstraint: '*' },
      { type: 'greasemonkey', versionConstraint: '*' }
    ],
    author: [
      { type: 'tampermonkey', versionConstraint: '*' },
      { type: 'violentmonkey', versionConstraint: '*' }
    ],
    antifeature: [
      { type: 'tampermonkey', versionConstraint: '>=4.12' },
      { type: 'violentmonkey', versionConstraint: '>=2.12.10' }
    ],
    copyright: [
      { type: 'tampermonkey', versionConstraint: '*' },
      { type: 'violentmonkey', versionConstraint: '*' }
    ],
    license: [{ type: 'tampermonkey', versionConstraint: '*' }],
    icon: [
      { type: 'adguard', versionConstraint: '*'},
      { type: 'tampermonkey', versionConstraint: '>=2.0.2359' },
      { type: 'violentmonkey', versionConstraint: '*' },
      { type: 'greasemonkey', versionConstraint: '>=0.9.0' }
    ],
    defaulticon: [
      { type: 'adguard', versionConstraint: '*' },
      { type: 'tampermonkey', versionConstraint: '>=2.0.2359' }
    ],
    icon64: [
      { type: 'adguard', versionConstraint: '*' },
      { type: 'tampermonkey', versionConstraint: '>=2.0.2359' }
    ],
    iconURL: [
      { type: 'adguard', versionConstraint: '*' },
      { type: 'tampermonkey', versionConstraint: '>=2.0.2359' }
    ],
    icon64URL: [
      { type: 'adguard', versionConstraint: '*' },
      { type: 'tampermonkey', versionConstraint: '>=2.0.2359' }
    ],
    homepage: [
      { type: 'adguard', versionConstraint: '*' },
      { type: 'tampermonkey', versionConstraint: '>=2.0.2395' },
      { type: 'violentmonkey', versionConstraint: '*' }
    ],
    homepageURL: [
      { type: 'adguard', versionConstraint: '*' },
      { type: 'tampermonkey', versionConstraint: '>=2.0.2395' },
      { type: 'violentmonkey', versionConstraint: '>=2.1.5' }
    ],
    website: [
      { type: 'adguard', versionConstraint: '*' },
      { type: 'tampermonkey', versionConstraint: '>=2.0.2395' },
      { type: 'violentmonkey', versionConstraint: '>=2.13.1.2' }
    ],
    source: [
      { type: 'adguard', versionConstraint: '*' },
      { type: 'tampermonkey', versionConstraint: '>=2.0.2395' },
      { type: 'violentmonkey', versionConstraint: '>=2.13.1.2' }
    ],
    downloadURL: [
      { type: 'adguard', versionConstraint: '*' },
      { type: 'tampermonkey', versionConstraint: '>=2.5.64' },
      { type: 'violentmonkey', versionConstraint: '*' },
      { type: 'greasemonkey', versionConstraint: '>=0.9.14' }
    ],
    updateURL: [
      { type: 'adguard', versionConstraint: '*' },
      { type: 'tampermonkey', versionConstraint: '>=2.5.64' },
      { type: 'violentmonkey', versionConstraint: '*' },
      { type: 'greasemonkey', versionConstraint: '>=0.9.12' }
    ],
    installURL: [{ type: 'greasemonkey', versionConstraint: '>=0.9.2' }],
    supportURL: [
      { type: 'tampermonkey', versionConstraint: '>=3.8' },
      { type: 'violentmonkey', versionConstraint: '>=2.1.6.2' }
    ],
    tag: [{ type: 'tampermonkey', versionConstraint: '>=5.3' }],

    // OpenUserJS
    collaborator: [],
    unstableMinify: [],
    'oujs:author': [],
    'oujs:collaborator': [],

    // UserScripts.org
    'uso:script': [],
    'uso:version': [],
    'uso:timestamp': [],
    'uso:hash': [],
    'uso:rating': [],
    'uso:installs': [],
    'uso:reviews': [],
    'uso:discussions': [],
    'uso:fans': [],
    'uso:unlisted': [],
    contributor: [],
    contributors: [],
    major: [],
    minor: [],
    build: [],

    // GreasyFork
    contributionURL: [],
    contributionAmount: [],
    incompatible: [],
    compatible: [{ type: 'violentmonkey', versionConstraint: '>=2.12.10' }],

    // Popular but not documented
    history: [],
    browser: [],

    // Scriptish
    id: [],
    developer: [],
    screenshot: [],
    priority: [],
    delay: [],
    css: [],
    jsversion: [],
    creator: []
  }
};
