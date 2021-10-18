'use strict';

const requireIndex = require('requireindex');

module.exports.rules = requireIndex(__dirname + '/rules');

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
      'userscripts/no-invalid-grant': 'error'
    }
  }
};
