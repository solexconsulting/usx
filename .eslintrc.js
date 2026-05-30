module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    // Removed 'project' to fix parsing error
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      rules: {
        // Place TypeScript-specific rules here
      },
    },
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