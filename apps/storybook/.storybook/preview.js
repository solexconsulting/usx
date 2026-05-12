import "@uswds/uswds/css/uswds.min.css";
import './styles.scss';
import solexTheme from "./solexTheme";

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      theme: solexTheme,
      toc: {
        title: 'On this page',
      },
    }
  },
};

export default preview;
