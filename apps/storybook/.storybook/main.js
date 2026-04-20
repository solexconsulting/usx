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
  // base: './' makes Vite emit relative asset URLs so Storybook works
  // behind any subpath proxy without a build-time configuration.
  viteFinal: (config) => {
    config.base = './';
    return config;
  },
  previewHead: (head) => `
    ${head}
    <script>window.usxBaseUrl = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);</script>
    <script>fetch('./env-config.js').then(r=>r.ok&&r.text()).then(t=>t&&new Function(t)()).catch(()=>{})</script>
    <script src="./js/uswds-init.min.js"></script>
    <script src="./js/uswds.min.js" defer></script>
  `
};