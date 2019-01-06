module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },

  parserOptions: {
    parser: 'typescript-eslint-parser',
  },

  extends: [
    'plugin:vue/essential',
    '@vue/prettier',
    '@vue/typescript',
    '@vue/standard'
  ],

  'extends': [
    'plugin:vue/essential',
    '@vue/prettier',
    '@vue/typescript',
    '@vue/standard',
    'eslint:recommended'
  ]
};
