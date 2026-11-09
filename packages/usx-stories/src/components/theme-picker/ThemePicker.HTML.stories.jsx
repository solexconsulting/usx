import React, { useEffect } from 'react';
import reactSnapshot from '../../../../usx-react/src/components/theme-picker/theme-picker.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/theme-picker/theme-picker.django-snapshot.html?raw';
import { applyStoryTheme } from '../../utils/storyTheme.js';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';
import { expect, userEvent, waitFor } from 'storybook/test';
import { storyDefs } from './ThemePicker.React.stories.jsx';
import { componentInit } from '../../utils/storyHelpers.jsx';
import {
  createAllVariantsPlay,
  sectionFor,
  sectionTitle,
  snapshotId,
} from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/ThemePicker',
  tags: ['USX', 'autodocs'],
  decorators: [
    ...componentInit('themePicker'),
    (Story) => {
      useEffect(() => {
        const change = (event) => {
          if (event.target.matches('.usx-theme-picker select')) {
            applyStoryTheme(event.target.value);
          }
        };
        document.addEventListener('change', change);
        return () => document.removeEventListener('change', change);
      }, []);
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

const visible = (element) => getComputedStyle(element).display !== 'none';

const checkPicker = (def) => async (picker) => {
  const select = picker.querySelector('select');
  await waitFor(() => expect(picker).toHaveAttribute('data-enhanced', 'true'));
  await expect(select.id).toMatch(snapshotId(def.id));
  await expect(select.labels[0]).toHaveTextContent(def.label);
  const options = [...select.options];
  await expect(options.map((option) => [option.value, option.textContent])).toEqual(
    def.themes.map((theme) => [theme.value, theme.label])
  );
  await expect(select).toHaveValue(def.value ?? def.defaultValue);

  if (def.variant === 'swap') {
    const input = picker.querySelector('.usx-theme-picker__swap input');
    await expect(input).not.toBeChecked();
    await expect(input).toHaveAccessibleName(/Switch to Dark/);
    await expect(picker.querySelector('.usx-theme-picker__fallback')).not.toBeVisible();
    return;
  }
  if (def.variant === 'ghost-select') {
    const face = picker.querySelector('.usx-theme-picker__ghost-face');
    await expect(face.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    await expect(face).toHaveTextContent('');
    await expect(select).toHaveAccessibleName(def.label);
    return;
  }

  const trigger = picker.querySelector('.usx-theme-picker__trigger');
  const panel = picker.querySelector('.usx-theme-picker__panel');
  const confirm = panel.querySelector('.usx-theme-picker__toggle');
  await expect(trigger).toBeVisible();
  await expect(panel).not.toBeVisible();
  await expect(trigger).toHaveAttribute('aria-label', def.label);
  await expect(trigger).toHaveAttribute('type', 'button');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toHaveAttribute('aria-controls', panel.id);
  await expect(trigger.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  await expect(confirm).toHaveAttribute('aria-label', 'Confirm theme');
};
const checks = Object.fromEntries(
  Object.entries(storyDefs)
    .filter(([key]) => !key.startsWith('Unenhanced'))
    .map(([key, def]) => [sectionTitle(key), checkPicker(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  const picker = sectionFor(context.canvasElement, sectionTitle(Object.keys(storyDefs)[0]));
  const select = picker.querySelector('select');
  await context.step('Opening and closing', async () => {
    const trigger = picker.querySelector('.usx-theme-picker__trigger');
    const panel = picker.querySelector('.usx-theme-picker__panel');
    await userEvent.click(trigger);
    await waitFor(() => expect(visible(panel)).toBe(true));
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(trigger).not.toBeVisible();
    await expect(select).toHaveAccessibleName('Theme');

    const other = [...select.options].find((option) => option.value !== select.value);
    await userEvent.selectOptions(select, other.value);
    await expect(select).toHaveValue(other.value);

    await userEvent.click(picker.querySelector('.usx-theme-picker__toggle'));
    await waitFor(() => expect(visible(panel)).toBe(false));
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeVisible();
  });
  const section = (key) => sectionFor(context.canvasElement, sectionTitle(key));
  await context.step('Swap picks the other theme', async () => {
    const swap = section('Swap');
    await userEvent.click(swap.querySelector('.usx-theme-picker__swap'));
    await expect(swap.querySelector('select')).toHaveValue('Borealis');
  });
  await context.step('Ghost select accepts a native change', async () => {
    const ghost = section('GhostSelect');
    await userEvent.selectOptions(ghost.querySelector('select'), 'Forest');
    await expect(ghost.querySelector('select')).toHaveValue('Forest');
    await expect(ghost.querySelector('.usx-theme-picker__ghost-face')).toHaveTextContent('');
  });
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play,
};
