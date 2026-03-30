export default {
  stories: ['../../../packages/core/src/components/**/*stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  staticDirs: [
    '../../../node_modules/@uswds/uswds/dist',
    '../static',
  ],
};