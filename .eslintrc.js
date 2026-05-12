module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier', 'plugin:storybook/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
  },
  overrides: [
    {
      files: ['**/*.stories.jsx'],
      rules: {
        'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};