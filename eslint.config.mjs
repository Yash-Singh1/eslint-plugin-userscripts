import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginEslintPlugin from 'eslint-plugin-eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import unicornPlugin from 'eslint-plugin-unicorn';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[] | import('eslint').Linter.Config} */
export default [
  ...[
    eslint.configs.recommended,
    eslintPluginEslintPlugin.configs['flat/recommended'],
    importPlugin.configs.typescript,
    comments.recommended,
    unicornPlugin.configs['flat/recommended']
  ].map((config) => ({
    ...config,
    ignores: ['dist/**/*', 'coverage/**/*']
  })),

  {
    ignores: ['dist/**/*', 'coverage/**/*'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2023
      },
      globals: {
        ...globals.node
      }
    },
    rules: {
      'eslint-plugin/test-case-property-ordering': 'error',
      'eslint-plugin/test-case-shorthand-strings': 'error',
      'unicorn/prefer-module': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/prefer-array-find': 'error',
      'unicorn/no-null': 'off',
      'unicorn/prefer-at': 'off',
      '@eslint-community/eslint-comments/no-unused-disable': 'error'
    }
  },
  ...tseslint.config(...tseslint.configs.recommended).flatMap((config) => ({
    ...config,
    files: ['**/*.ts']
  })),
  {
    files: ['tests/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.mocha
      }
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off' // Typescript-eslint errors on should.js expressions
    }
  }
];
