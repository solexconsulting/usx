// Single ESLint config for the whole workspace. Kept as .cjs because the root
// package.json is "type": "module" and legacy eslintrc files must be CommonJS.
module.exports = {
  root: true,
  // Scaffolding templates contain {{placeholders}} and are not valid JS.
  ignorePatterns: ['scripts/templates/**'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    // Documentation stories are prose-heavy; entity-escaping every apostrophe hurts readability.
    'react/no-unescaped-entities': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^React$', ignoreRestSiblings: true }],
  },
  overrides: [
    {
      // Build/generator scripts legitimately log to the console.
      files: ['scripts/**', 'packages/*/scripts/**', 'packages/*/test/**', 'packages/tokens/build.js'],
      rules: { 'no-console': 'off' },
    },
  ],
};
