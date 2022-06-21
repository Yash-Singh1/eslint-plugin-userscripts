'use strict';

const requireIndex = require('requireindex');

module.exports.rules = Object.fromEntries(
  Object.entries(requireIndex(__dirname + '/rules')).map(
    ([ruleName, ruleMeta]) => {
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
    }
  )
);

module.exports.configs = {
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
      'userscripts/use-download-and-update-url': 'error',
      'userscripts/align-attributes': ['error', 2],
      'userscripts/metadata-spacing': ['error', 'always'],
      'userscripts/no-invalid-headers': 'error',
      'userscripts/no-invalid-grant': 'error',
      'userscripts/compat-grant': 'off',
      'userscripts/compat-headers': 'off',
      'userscripts/better-use-match': 'warning'
    }
  }
};
