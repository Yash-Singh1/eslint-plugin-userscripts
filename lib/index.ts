'use strict';

import alignAttributes from './rules/align-attributes';
import betterUseMatch from './rules/better-use-match';
import compatGrant from './rules/compat-grant';
import compatHeaders from './rules/compat-headers';
import filenameUser from './rules/filename-user';
import metadataSpacing from './rules/metadata-spacing';
import noInvalidGrant from './rules/no-invalid-grant';
import noInvalidHeaders from './rules/no-invalid-headers';
import noInvalidMetadata from './rules/no-invalid-metadata';
import requireAttributeSpacePrefix from './rules/require-attribute-space-prefix';
import requireDescription from './rules/require-description';
import requireDownloadUrl from './rules/require-download-url';
import requireName from './rules/require-name';
import requireVersion from './rules/require-version';
import useHomepageAndUrl from './rules/use-homepage-and-url';
import type { ESLint } from 'eslint';

const rules = Object.fromEntries(
  Object.entries({
    'align-attributes': alignAttributes,
    'better-use-match': betterUseMatch,
    'compat-grant': compatGrant,
    'compat-headers': compatHeaders,
    'filename-user': filenameUser,
    'metadata-spacing': metadataSpacing,
    'no-invalid-grant': noInvalidGrant,
    'no-invalid-headers': noInvalidHeaders,
    'no-invalid-metadata': noInvalidMetadata,
    'require-attribute-space-prefix': requireAttributeSpacePrefix,
    'require-description': requireDescription,
    'require-download-url': requireDownloadUrl,
    'require-name': requireName,
    'require-version': requireVersion,
    'use-homepage-and-url': useHomepageAndUrl
  }).map(([ruleName, ruleMeta]) => {
    return [
      ruleName,
      {
        ...ruleMeta,
        meta: {
          ...ruleMeta.meta,
          docs: {
            ...ruleMeta.meta.docs,
            url: `https://yash-singh1.github.io/eslint-plugin-userscripts/#/rules/${ruleName}`
          }
        }
      }
    ];
  })
) satisfies ESLint.Plugin['rules'];

const configs = {
  recommended: {
    plugins: ['userscripts'],
    rules: {
      'userscripts/filename-user': ['error', 'always'],
      'userscripts/no-invalid-metadata': ['error', { top: 'required' }],
      'userscripts/require-name': ['error', 'required'],
      'userscripts/require-description': ['error', 'required'],
      'userscripts/require-version': ['error', 'required'],
      'userscripts/require-attribute-space-prefix': 'error',
      'userscripts/use-homepage-and-url': 'error',
      'userscripts/require-download-url': 'error',
      'userscripts/align-attributes': ['error', 2],
      'userscripts/metadata-spacing': ['error', 'always'],
      'userscripts/no-invalid-headers': 'error',
      'userscripts/no-invalid-grant': 'error',
      'userscripts/compat-grant': 'off',
      'userscripts/compat-headers': 'off',
      'userscripts/better-use-match': 'warn'
    }
  }
} satisfies ESLint.Plugin['configs'];

export { rules, configs };
