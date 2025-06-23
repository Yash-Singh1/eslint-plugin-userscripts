import type { CompatMap, VersionAssertion } from './version-assertion';

// Documentation:
// - Tampermonkey: https://www.tampermonkey.net/documentation.php#_grant
// - Violentmonkey: https://violentmonkey.github.io/api/gm
// - Greasemonkey: https://wiki.greasespot.net/Greasemonkey_Manual:API
export const compatMap: CompatMap = {
  'GM.addElement': [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '>=4.11.6113' },
    { type: 'violentmonkey', versionConstraint: '>=2.13.0-beta.3' }
  ],
  GM_addElement: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '>=4.11.6113' },
    { type: 'violentmonkey', versionConstraint: '>=2.13.0-beta.3' }
  ],
  'GM.addStyle': [
    { type: 'tampermonkey', versionConstraint: '>=4.5' },
    { type: 'violentmonkey', versionConstraint: '>=2.12.0' }
  ],
  GM_addStyle: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '*' },
    { type: 'violentmonkey', versionConstraint: '*' },
    { type: 'greasemonkey', versionConstraint: '>=0.6.1.4 <4' }
  ],
  'GM.addValueChangeListener': [
    { type: 'tampermonkey', versionConstraint: '>=4.5' }
  ],
  GM_addValueChangeListener: [
    { type: 'tampermonkey', versionConstraint: '>=2.3.2607' },
    { type: 'violentmonkey', versionConstraint: '>=2.12.0' }
  ],
  'GM.cookie': [{ type: 'tampermonkey', versionConstraint: '>=4.8' }],
  GM_cookie: [{ type: 'tampermonkey', versionConstraint: '>=4.8' }],
  'GM.deleteValue': [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '>=4.5' },
    { type: 'violentmonkey', versionConstraint: '>=2.12.0' },
    { type: 'greasemonkey', versionConstraint: '>=4.0' }
  ],
  GM_deleteValue: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '*' },
    { type: 'violentmonkey', versionConstraint: '*' },
    { type: 'greasemonkey', versionConstraint: '>=0.8.20090123.1 <4' }
  ],
  'GM.deleteValues': [{ type: 'tampermonkey', versionConstraint: '>=5.3' }],
  GM_deleteValues: [{ type: 'tampermonkey', versionConstraint: '>=5.3' }],
  'GM.download': [{ type: 'tampermonkey', versionConstraint: '>=4.5' }],
  GM_download: [
    { type: 'tampermonkey', versionConstraint: '>=3.8' },
    { type: 'violentmonkey', versionConstraint: '>=2.9.5' }
  ],
  'GM.getResourceText': [{ type: 'tampermonkey', versionConstraint: '>=4.5' }],
  GM_getResourceText: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '*' },
    { type: 'violentmonkey', versionConstraint: '*' },
    { type: 'greasemonkey', versionConstraint: '>=0.8.20080609.0 <4' }
  ],
  'GM.getResourceURL': [
    { type: 'violentmonkey', versionConstraint: '>=2.12.0 <2.13.0.10' }
  ],
  GM_getResourceURL: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '*' },
    { type: 'violentmonkey', versionConstraint: '*' },
    { type: 'greasemonkey', versionConstraint: '>=0.8.20080609.0 <4' }
  ],
  'GM.getResourceUrl': [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '>=4.5' },
    { type: 'violentmonkey', versionConstraint: '>=2.13.0.10' },
    { type: 'greasemonkey', versionConstraint: '>=4.0' }
  ],
  'GM.getTab': [{ type: 'tampermonkey', versionConstraint: '>=4.5' }],
  GM_getTab: [{ type: 'tampermonkey', versionConstraint: '>=4.0.10' }],
  'GM.getTabs': [{ type: 'tampermonkey', versionConstraint: '>=4.5' }],
  GM_getTabs: [{ type: 'tampermonkey', versionConstraint: '>=4.0.10' }],
  'GM.getValue': [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '>=4.5' },
    { type: 'violentmonkey', versionConstraint: '>=2.12.0' },
    { type: 'greasemonkey', versionConstraint: '>=4.0' }
  ],
  GM_getValue: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '*' },
    { type: 'violentmonkey', versionConstraint: '*' },
    { type: 'greasemonkey', versionConstraint: '>=0.3-beta <4' }
  ],
  'GM.getValues': [{ type: 'tampermonkey', versionConstraint: '>=5.3' }],
  GM_getValues: [{ type: 'tampermonkey', versionConstraint: '>=5.3' }],
  'GM.info': [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '>=4.5' },
    { type: 'violentmonkey', versionConstraint: '>=2.12.0' },
    { type: 'greasemonkey', versionConstraint: '>=4' }
  ],
  GM_info: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '>=2.4.2718' },
    { type: 'violentmonkey', versionConstraint: '*' },
    { type: 'greasemonkey', versionConstraint: '>=0.9.16 <4' }
  ],
  'GM.listValues': [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '>=4.5' },
    { type: 'violentmonkey', versionConstraint: '>=2.12.0' },
    { type: 'greasemonkey', versionConstraint: '>=4' }
  ],
  GM_listValues: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '*' },
    { type: 'violentmonkey', versionConstraint: '*' },
    { type: 'greasemonkey', versionConstraint: '>=0.8.20090123.1 <4' }
  ],
  'GM.log': [
    { type: 'tampermonkey', versionConstraint: '>=4.5' },
    { type: 'greasemonkey', versionConstraint: '>=4' }
  ],
  GM_log: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '*' },
    { type: 'violentmonkey', versionConstraint: '*' },
    { type: 'greasemonkey', versionConstraint: '>=0.3-beta <4' }
  ],
  'GM.notification': [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '>=4.5' },
    { type: 'violentmonkey', versionConstraint: '>=2.12.0' },
    { type: 'greasemonkey', versionConstraint: '>=4' }
  ],
  GM_notification: [
    { type: 'tampermonkey', versionConstraint: '>=2.0.2344' },
    { type: 'violentmonkey', versionConstraint: '>=2.5.0' }
  ],
  'GM.openInTab': [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '>=4.5' },
    { type: 'violentmonkey', versionConstraint: '>=2.12.0' },
    { type: 'greasemonkey', versionConstraint: '>=4' }
  ],
  GM_openInTab: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '*' },
    { type: 'violentmonkey', versionConstraint: '*' },
    { type: 'greasemonkey', versionConstraint: '>=0.5-beta <4' }
  ],
  'GM.registerMenuCommand': [
    { type: 'tampermonkey', versionConstraint: '>=4.5' },
    { type: 'violentmonkey', versionConstraint: '>=2.12.0' },
    { type: 'greasemonkey', versionConstraint: '>=4.11' }
  ],
  GM_registerMenuCommand: [
    { type: 'tampermonkey', versionConstraint: '*' },
    { type: 'violentmonkey', versionConstraint: '*' },
    { type: 'greasemonkey', versionConstraint: '>=0.2.5 <4' }
  ],
  'GM.removeValueChangeListener': [
    { type: 'tampermonkey', versionConstraint: '>=4.5' }
  ],
  GM_removeValueChangeListener: [
    { type: 'tampermonkey', versionConstraint: '>=2.3.2607' },
    { type: 'violentmonkey', versionConstraint: '>=2.12.0' }
  ],
  'GM.saveTab': [{ type: 'tampermonkey', versionConstraint: '>=4.5' }],
  GM_saveTab: [{ type: 'tampermonkey', versionConstraint: '>=4.0.10' }],
  'GM.setClipboard': [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '>=4.5' },
    { type: 'violentmonkey', versionConstraint: '>=2.12.0' },
    { type: 'greasemonkey', versionConstraint: '>=4' }
  ],
  GM_setClipboard: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '>=2.6.2767' },
    { type: 'violentmonkey', versionConstraint: '>=2.5.0' },
    { type: 'greasemonkey', versionConstraint: '>=1.10 <4' }
  ],
  'GM.setValue': [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '>=4.5' },
    { type: 'violentmonkey', versionConstraint: '>=2.12.0' },
    { type: 'greasemonkey', versionConstraint: '>=4' }
  ],
  GM_setValue: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '*' },
    { type: 'violentmonkey', versionConstraint: '*' },
    { type: 'greasemonkey', versionConstraint: '>=0.3-beta <4' }
  ],
  'GM.setValues': [{ type: 'tampermonkey', versionConstraint: '>=5.3' }],
  GM_setValues: [{ type: 'tampermonkey', versionConstraint: '>=5.3' }],
  'GM.unregisterMenuCommand': [
    { type: 'tampermonkey', versionConstraint: '>=4.5' }
  ],
  GM_unregisterMenuCommand: [
    { type: 'tampermonkey', versionConstraint: '>=3.6.3737' },
    { type: 'violentmonkey', versionConstraint: '>=2.9.4' }
  ],
  'GM.webRequest': [{ type: 'tampermonkey', versionConstraint: '>=4.5 <=5.2' }],
  GM_webRequest: [{ type: 'tampermonkey', versionConstraint: '>=4.4 <=5.2' }],
  GM_xmlhttpRequest: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '*' },
    { type: 'violentmonkey', versionConstraint: '*' },
    { type: 'greasemonkey', versionConstraint: '>=0.2.5 <4' }
  ],
  'GM.xmlHttpRequest': [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '>=4.5' },
    { type: 'violentmonkey', versionConstraint: '>=2.12.0' },
    { type: 'greasemonkey', versionConstraint: '>=4.0' }
  ],
  none: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '*' },
    { type: 'violentmonkey', versionConstraint: '*' },
    { type: 'greasemonkey', versionConstraint: '*' }
  ],
  unsafeWindow: [
    { type: 'adguard', versionConstraint: '*' },
    { type: 'tampermonkey', versionConstraint: '*' },
    { type: 'violentmonkey', versionConstraint: '*' },
    { type: 'greasemonkey', versionConstraint: '>=0.5-beta' }
  ],
  'window.close': [
    { type: 'tampermonkey', versionConstraint: '>=3.12.58' },
    { type: 'violentmonkey', versionConstraint: '>=2.6.2' }
  ],
  'window.focus': [
    { type: 'tampermonkey', versionConstraint: '>=3.12.58' },
    { type: 'violentmonkey', versionConstraint: '>=2.12.10' }
  ],
  'window.onurlchange': [{ type: 'tampermonkey', versionConstraint: '>=4.11' }],
  'property:settings': [
    { type: 'adguard', versionConstraint: '*' },
  ]
};

export const gmPolyfillOverride: {
  [Key in keyof typeof compatMap]?:
    | 'ignore'
    | {
        deps: (keyof typeof compatMap)[];
        versions: VersionAssertion[];
      }
    | {
        deps: (keyof typeof compatMap)[];
      }
    | {
        versions: VersionAssertion[];
      };
} = {
  GM_addStyle: 'ignore',
  GM_registerMenuCommand: 'ignore',
  GM_getResourceText: {
    deps: ['GM.getResourceUrl', 'GM.log']
  },
  'GM.log': 'ignore',
  'GM.info': {
    deps: ['GM_info']
  },
  'GM.addStyle': {
    deps: ['GM_addStyle']
  },
  'GM.deleteValue': {
    deps: ['GM_deleteValue']
  },
  'GM.getResourceUrl': {
    deps: ['GM_getResourceURL']
  },
  'GM.getValue': {
    deps: ['GM_getValue']
  },
  'GM.listValues': {
    deps: ['GM_listValues']
  },
  'GM.notification': {
    deps: ['GM_notification']
  },
  'GM.openInTab': {
    deps: ['GM_openInTab']
  },
  'GM.registerMenuCommand': {
    deps: ['GM_registerMenuCommand']
  },
  'GM.setClipboard': {
    deps: ['GM_setClipboard']
  },
  'GM.setValue': {
    deps: ['GM_setValue']
  },
  'GM.xmlHttpRequest': {
    deps: ['GM_xmlhttpRequest']
  },
  'GM.getResourceText': {
    deps: ['GM_getResourceText']
  }
};
