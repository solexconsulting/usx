import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/theme-picker/theme-picker.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/theme-picker/theme-picker.django-snapshot.html?raw';
import { useGlobals } from 'storybook/preview-api';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';
import { expect, userEvent, waitFor } from 'storybook/test';
import { storyDefs } from './ThemePicker.React.stories.jsx';
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
    (Story) => {
      // Subscribe to Storybook globals so the toolbar theme decorator re-applies
      // when this story's ThemePicker changes the selection.
      useGlobals();
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
  const trigger = picker.querySelector('.usx-theme-picker__trigger');
  const panel = picker.querySelector('.usx-theme-picker__panel');
  const select = panel.querySelector('select');
  const confirm = panel.querySelector('.usx-theme-picker__toggle');

  // Closed: only the palette button shows.
  await expect(trigger).toHaveAttribute('aria-label', def.label);
  await expect(trigger).toHaveAttribute('type', 'button');
  await expect(trigger.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  await expect(trigger).toBeVisible();
  await expect(panel).not.toBeVisible();

  await expect(select.id).toMatch(snapshotId(def.id));
  await expect(panel.querySelector('label')).toHaveAttribute('for', select.id);
  await expect(panel.querySelector('label')).toHaveTextContent(def.label);
  await expect(confirm).toHaveAttribute('aria-label', 'Confirm theme');
  const options = [...select.options];
  await expect(options.map((option) => [option.value, option.textContent])).toEqual(
    def.themes.map((theme) => [theme.value, theme.label])
  );
  await expect(select).toHaveValue(def.defaultValue);
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkPicker(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  const picker = sectionFor(context.canvasElement, sectionTitle(Object.keys(storyDefs)[0]));
  const select = picker.querySelector('select');
  // Opening is wired by an inline handler that only the Django markup carries; React's lives in its component.
  if (!select.id.startsWith('django-')) return;

  await context.step('Opening and closing', async () => {
    const trigger = picker.querySelector('.usx-theme-picker__trigger');
    const panel = picker.querySelector('.usx-theme-picker__panel');
    await userEvent.click(trigger);
    await waitFor(() => expect(visible(panel)).toBe(true));
    await expect(trigger).not.toBeVisible();
    await expect(select).toHaveAccessibleName('Theme');

    const other = [...select.options].find((option) => option.value !== select.value);
    await userEvent.selectOptions(select, other.value);
    await expect(select).toHaveValue(other.value);

    await userEvent.click(picker.querySelector('.usx-theme-picker__toggle'));
    await waitFor(() => expect(visible(panel)).toBe(false));
    await expect(trigger).toBeVisible();
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
