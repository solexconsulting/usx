import React from 'react';
import "@uswds/uswds/css/uswds.min.css";
// Runtime theme values (:root custom properties) — required because the
// themed usx build emits bare var(--usx-*) with no fallback.
import "@solexllc/usx-theme/theme.css";
import './styles.scss';
import solexTheme from "./solexTheme";
import { resolveTheme, themeToCss } from '../../../packages/usx-stories/src/utils/themeDerive.js';
import { PRESETS } from '../../../packages/usx-stories/src/utils/themePresets.js';

// Applies the toolbar-selected preset (see globalTypes.theme below) to every
// story by overriding :root's --usx-* custom properties — the same
// resolveTheme/themeToCss pipeline the Theme Playground uses for its presets.
//
// The Playground has its own preset picker and injects its own :root
// overrides (see ThemePlayground's `liveThemeCss`) from its independent,
// in-page state. Since that override only emits *changed* tokens, any token
// the toolbar's global theme changes but the Playground's own selection
// doesn't would otherwise leak through from this decorator underneath it —
// so skip applying the global override entirely while on that story.
function withThemePreset(Story, context) {
  if (context.id === 'foundations-theme--playground') {
    return React.createElement(Story);
  }
  const overrides = PRESETS[context.globals.theme] || {};
  const css = themeToCss(resolveTheme(overrides), { changedOnly: true });
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', null, css),
    React.createElement(Story)
  );
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
