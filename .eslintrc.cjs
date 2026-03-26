module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: { react: { version: 'detect' } },
  rules: {
    'no-console': 'warn',
    'react/prop-types': 'off',
    'no-unused-vars': ['error', { 'varsIgnorePattern': '^React$' }]
  }
};
