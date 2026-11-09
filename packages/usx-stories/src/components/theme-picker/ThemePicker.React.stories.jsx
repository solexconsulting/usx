import { controlledStory } from '../../utils/storyHelpers.jsx';
import React from 'react';
import { useGlobals } from 'storybook/preview-api';
import ThemePicker from '../../../../usx-react/src/components/theme-picker/ThemePicker.tsx';
import config from '../../../../usx-react/src/components/theme-picker/config.json';
import { buildArgTypes, componentInit } from '../../utils/storyHelpers.jsx';
import { PRESETS } from '@solexllc/usx-theme/presets';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';
import { applyStoryTheme } from '../../utils/storyTheme.js';

const PRESET_NAMES = Object.keys(PRESETS);
// Same theme names as the toolbar. Applying a theme remains the
// installation's job; these stories update the preview's CSS variables directly.
const THEMES = PRESET_NAMES.map((name) => ({ value: name, label: name }));
const LIGHTDARKTHEMES = [
  { value: 'Aurora', label: 'Light' },
  { value: 'Borealis', label: 'Dark' },
];

export const storyDefs = {
  Default: config.default,
  WithValue: {
    ...config.default,
    id: 'theme-picker-value',
    value: 'Forest',
    defaultValue: 'Default',
  },
  Unenhanced: {
    ...config.default,
    id: 'theme-picker-unenhanced',
    extraAttributes: { 'usx-data-enhanced': 'true' },
  },
  GhostSelect: { ...config.default, id: 'theme-picker-ghost-select', variant: 'ghost-select' },
  Swap: {
    id: 'theme-picker-swap',
    label: 'Theme',
    variant: 'swap',
    themes: LIGHTDARKTHEMES,
    defaultValue: 'Aurora',
  },
  LightDark: {
    id: 'theme-picker-2',
    label: 'Theme',
    themes: LIGHTDARKTHEMES,
    defaultValue: 'Aurora',
  },
};

export default {
  title: 'React/USX/ThemePicker',
  component: ThemePicker,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs', 'Unenhanced'],
  decorators: [
    ...componentInit('themePicker'),
    (Story) => {
      return (
        <>
          <Alert
            variant="info"
            slim={true}
            text={
              'This story is decorated with a background color and theme/state color boxes for demonstration purposes.'
            }
            className="margin-bottom-2"
          />
          <Story />
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <div
              style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-primary)' }}
            />
            <div
              style={{
                height: '1rem',
                width: '2rem',
                backgroundColor: 'var(--usx-color-secondary)',
              }}
            />
            <div
              style={{
                height: '1rem',
                width: '2rem',
                backgroundColor: 'var(--usx-color-accent-cool)',
              }}
            />
            <div
              style={{
                height: '1rem',
                width: '2rem',
                backgroundColor: 'var(--usx-color-accent-warm)',
              }}
            />
            <div
              style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-info)' }}
            />
            <div
              style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-success)' }}
            />
            <div
              style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-warning)' }}
            />
            <div
              style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-color-error)' }}
            />
            <div
              style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-surface-2)' }}
            />
            <div
              style={{ height: '1rem', width: '2rem', backgroundColor: 'var(--usx-surface-3)' }}
            />
          </div>
        </>
      );
    },
  ],
};

function liveThemePicker(themes) {
  return function LiveThemePicker(args) {
    const [globals] = useGlobals();
    const initialValue = themes.some((theme) => theme.value === globals.theme)
      ? globals.theme
      : themes[0]?.value;
    return (
      <ThemePicker
        {...args}
        key={globals.theme}
        themes={themes}
        defaultValue={initialValue}
        onChange={applyStoryTheme}
      />
    );
  };
}

export const Default = {
  args: storyDefs.Default,
  render: liveThemePicker(THEMES),
};

export const Unenhanced = {
  args: storyDefs.Unenhanced,
  parameters: {
    docs: {
      description: {
        story:
          'Without USX JavaScript, the native theme select stays visible and usable. The palette trigger and confirmation control are unavailable.',
      },
    },
  },
};

export const LightDark = {
  args: storyDefs.LightDark,
  render: liveThemePicker(LIGHTDARKTHEMES),
};

export const GhostSelect = {
  args: storyDefs.GhostSelect,
  render: liveThemePicker(THEMES),
};

export const Swap = {
  args: storyDefs.Swap,
  render: liveThemePicker(LIGHTDARKTHEMES),
};

export const WithValue = controlledStory(ThemePicker, storyDefs.WithValue, {
  read: (value) => value,
});
