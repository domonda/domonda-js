module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: ['prettier', '@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  settings: {
    react: {
      // don"t require react to be installed (some packages don"t even use react)
      version: '999.999.999',
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    // general
    'no-console': 'error',
    'no-case-declarations': 'off',

    // prettier
    'prettier/prettier': 'error',

    // TypeScript
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/class-name-casing': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-empty-function': 'off', // sometimes necessary
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // sometimes type assertion is neccessary and TypeScript will disallow it if it does not fit
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-expect-error': 'allow-with-description', 'ts-ignore': 'allow-with-description' },
    ],

    // react
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'error',
    'react-hooks/rules-of-hooks': 'error',
  },
};
