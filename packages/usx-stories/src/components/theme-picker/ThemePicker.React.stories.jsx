import React from 'react';
import ThemePicker from '../../../../usx-react/src/components/theme-picker/ThemePicker.tsx';
import config from '../../../../usx-react/src/components/theme-picker/config.json';
import { buildArgTypes, componentInit } from '../../utils/storyHelpers.jsx';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';

const LIGHTDARKTHEMES = [
  { value: 'aurora', label: 'Light' },
  { value: 'borealis', label: 'Dark' },
];
const SWAP = {
  id: 'theme-picker-swap',
  label: 'Theme',
  variant: 'swap',
  themes: LIGHTDARKTHEMES,
  defaultValue: 'aurora',
};
const POPOVER = {
  ...config.default,
  id: 'theme-picker-popover',
  name: 'theme',
  variant: 'popover',
};

export const storyDefs = {
  Default: config.default,
  WithValue: {
    ...config.default,
    id: 'theme-picker-value',
    value: 'forest',
    defaultValue: 'default',
  },
  Unenhanced: {
    ...config.default,
    id: 'theme-picker-unenhanced',
    extraAttributes: { 'usx-data-enhanced': 'true' },
  },
  Popover: POPOVER,
  PopoverEnd: {
    ...POPOVER,
    id: 'theme-picker-popover-end',
    popoverAlign: 'end',
    className: 'margin-left-15',
    themes: LIGHTDARKTHEMES,
    defaultValue: 'aurora',
  },
  Swap: SWAP,
  LightDark: {
    id: 'theme-picker-2',
    label: 'Theme',
    themes: LIGHTDARKTHEMES,
    defaultValue: 'aurora',
  },
};

export default {
  title: 'React/USX/ThemePicker',
  component: ThemePicker,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
  decorators: [
    ...componentInit('themePicker', 'popover'),
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

export const Default = {
  args: storyDefs.Default,
};

export const Unenhanced = {
  args: storyDefs.Unenhanced,
  parameters: {
    docs: {
      description: {
        story: 'The picker stays hidden when enhancement is skipped.',
      },
    },
  },
};

export const LightDark = {
  args: storyDefs.LightDark,
};

export const Popover = {
  args: storyDefs.Popover,
};

export const PopoverEnd = {
  args: storyDefs.PopoverEnd,
};

export const Swap = {
  args: storyDefs.Swap,
};

export const WithValue = { args: storyDefs.WithValue };
