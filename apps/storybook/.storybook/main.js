export default {
  stories: ['../../../packages/core/src/**/*stories.@(js|jsx|mjs|ts|tsx)'],
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
  previewHead: (head) => `
    ${head}
    <script src="../node_modules/@uswds/uswds/dist/js/uswds.min.js"></script>
    <script src="../node_modules/@uswds/uswds/dist/js/uswds-init.min.js"></script>
  `
};