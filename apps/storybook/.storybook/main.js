import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
export default {
  stories: ['../../../packages/core/src/**/*stories.@(js|jsx|mjs|ts|tsx)'],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {}
  },

  addons: ['@storybook/addon-docs'],

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
    <script>
      console.log('USX Storybook: USWDS JS initialized');
      const exampleEventTrigger = (tada=null) => {
        if (tada) {
          console.log('Event triggered with context:', tada);
          // Use alert to imply functionality since we don't have a real data source in Storybook
          alert("Event triggered with context: " + tada);
        } else {
          console.log('Event triggered with no context');
          alert("Event triggered with no context");
        }
      };

      window.exampleEventTrigger = exampleEventTrigger;
    </script>
  `
};

function getAbsolutePath(value) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}