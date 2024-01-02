module.exports = {
  parser: '@babel/eslint-parser',
  plugins: [
    'eslint-plugin',
    'import',
    'unicorn',
    'eslint-comments',
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:eslint-plugin/recommended',
    'plugin:import/recommended',
    'plugin:unicorn/recommended',
    'plugin:import/typescript',
    'plugin:eslint-comments/recommended'
  ],
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2023
  },
  env: {
    node: true
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
    'eslint-comments/no-unused-disable': 'error'
  },
  overrides: [
    {
      files: 'tests/**/*.ts',
      env: {
        mocha: true
      }
    },
    {
      files: '**/*.ts',
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended']
    }
  ]
};
