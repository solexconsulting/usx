import "@uswds/uswds/css/uswds.min.css";
// Runtime theme values (:root custom properties) — required because the
// themed usx build emits bare var(--usx-*) with no fallback.
import "@solexllc/usx-theme/theme.css";
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
  // Declared so the manager tracks/persists the value written by the
  // "Filter by technology" tool (see .storybook/technologyToggle.jsx).
  // No `toolbar` — the addon renders its own control.
  globalTypes: {
    technology: {
      name: 'Technology',
      description: 'Which technology board to show',
      defaultValue: 'all',
    },
  },
};

export default preview;
