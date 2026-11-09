import React from 'react';
import '@solexllc/usx/js/start';
import "@uswds/uswds/css/uswds.min.css";
// Runtime theme values (:root custom properties) — required because the
// themed usx build emits bare var(--usx-*) with no fallback.
import "@solexllc/usx-theme/theme.css";
import './styles.scss';
import './controls-responsive.css';
import solexTheme from "./solexTheme";
import { resolveTheme, themeToCss } from '@solexllc/usx-theme/derive';
import { PRESETS } from '@solexllc/usx-theme/presets';
import { resetStoryTheme } from '../../../packages/usx-stories/src/utils/storyTheme.js';

// Applies the toolbar-selected preset (see globalTypes.theme below) to every
// story by overriding :root's --usx-* custom properties — the same
// resolveTheme/themeToCss pipeline the Theme Playground uses for its presets.
//
// The Playground has its own preset picker and emits only changed tokens.
// Skip the toolbar override there so its remaining tokens inherit the base
// theme, independent of the toolbar selection.
function ThemePreset({ Story, context }) {
  const theme = context.globals.theme;
  // A picker selection is local to the current story. A toolbar change or
  // story navigation restores the toolbar preset.
  React.useLayoutEffect(() => resetStoryTheme(), [context.id, theme]);
  if (context.parameters.isolateThemePreset) {
    return React.createElement(Story);
  }
  const overrides = PRESETS[theme] || {};
  const css = themeToCss(resolveTheme(overrides), { changedOnly: true });
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', null, css),
    React.createElement(Story)
  );
}

function withThemePreset(Story, context) {
  return React.createElement(ThemePreset, { Story, context });
}

const preview = {
  decorators: [withThemePreset],
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
    theme: {
      name: 'Theme',
      description: 'Preset theme applied globally across all stories',
      defaultValue: 'Default',
      toolbar: {
        icon: 'paintbrush',
        items: Object.keys(PRESETS).map((name) => ({ value: name, title: name })),
        showName: true,
      },
    },
  },
};


export default preview;
