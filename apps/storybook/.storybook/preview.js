import "@uswds/uswds/css/uswds.min.css";
import './styles.scss';
// Import USWDS JS so interactive components (accordion, etc.) initialize in the preview
import '../../../node_modules/@uswds/uswds/dist/js/uswds.min.js';
import '../../../node_modules/@uswds/uswds/dist/components/usa-banner.js.mjs';
import '../../../node_modules/@uswds/uswds/dist/js/uswds-init.min.js';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
