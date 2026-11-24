import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/theme-picker/theme-picker.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/theme-picker/theme-picker.django-snapshot.html?raw';
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

const visible = (element) => getComputedStyle(element).display !== 'none';

const checkPicker = (def) => async (picker) => {
  const field = picker.querySelector('select, input[type="hidden"]');
  if (def.extraAttributes?.['usx-data-enhanced'] === 'true') {
    await expect(picker).not.toHaveAttribute('data-enhanced');
    await expect(picker).toHaveAttribute('hidden');
    await expect(picker).not.toBeVisible();
    return;
  }
  await waitFor(() => expect(picker).toHaveAttribute('data-enhanced', 'true'));
  await expect(picker).not.toHaveAttribute('hidden');
  await expect(picker).toBeVisible();
  await expect(field.id).toMatch(snapshotId(def.id));
  if (def.name) await expect(field).toHaveAttribute('name', def.name);
  await expect(field).toHaveValue(def.value ?? def.defaultValue);
  if (def.variant === undefined || def.variant === 'default') {
    await expect(field.labels[0]).toHaveTextContent(def.label);
    await expect([...field.options].map((option) => [option.value, option.textContent])).toEqual(
      def.themes.map((theme) => [theme.value, theme.label])
    );
  }

  if (def.variant === 'swap') {
    const swap = picker.querySelector('.usx-theme-picker__swap');
    await expect(swap).toHaveAttribute('aria-pressed', 'false');
    await expect(swap).toHaveAccessibleName('Dark Theme');
    await expect(swap).toHaveAttribute('data-usx-theme-off', def.themes[0].value);
    await expect(swap).toHaveAttribute('data-usx-theme-on', def.themes[1].value);
    await expect(field).toHaveAttribute('type', 'hidden');
    await expect(picker.querySelector('select')).toBeNull();
    return;
  }
  if (def.variant === 'popover') {
    const popover = picker.querySelector('.usx-theme-picker__popover');
    await expect(popover).toHaveAttribute('data-align', def.popoverAlign ?? 'start');
    const trigger = popover.querySelector('summary');
    await expect(trigger).toHaveClass('usx-button--ghost');
    await expect(trigger).toHaveAccessibleName(def.label);
    await expect(trigger.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    await expect(popover.querySelector('.usx-popover__panel')).not.toBeVisible();
    await expect(picker.querySelector('select')).toBeNull();
    await expect(field).toHaveAttribute('type', 'hidden');
    const items = [...popover.querySelectorAll('.usx-popover__menu-item')];
    await expect(items.map((item) => item.textContent.trim())).toEqual(
      def.themes.map((theme) => theme.label)
    );
    await expect(items.filter((item) => item.getAttribute('aria-pressed') === 'true')).toHaveLength(
      1
    );
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
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkPicker(def)])
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
    await expect(document.documentElement).toHaveAttribute('data-usx-theme', other.value);

    await userEvent.click(picker.querySelector('.usx-theme-picker__toggle'));
    await waitFor(() => expect(visible(panel)).toBe(false));
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeVisible();
  });
  const section = (key) => sectionFor(context.canvasElement, sectionTitle(key));
  await context.step('Swap picks the other theme', async () => {
    const swap = section('Swap');
    await userEvent.click(swap.querySelector('.usx-theme-picker__swap'));
    await expect(swap.querySelector('.usx-theme-picker__swap')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await expect(swap.querySelector('.usx-theme-picker__swap')).toHaveAccessibleName('Dark Theme');
    await expect(swap.querySelector('input[type="hidden"]')).toHaveValue('borealis');
    await expect(document.documentElement).toHaveAttribute('data-usx-theme', 'borealis');
  });
  await context.step('Popover chooses a theme', async () => {
    const popover = section('Popover').querySelector('.usx-theme-picker__popover');
    await userEvent.click(popover.querySelector('summary'));
    await expect(popover).toHaveAttribute('open');
    await userEvent.click(popover.querySelector('[data-usx-theme-value="forest"]'));
    await expect(popover).not.toHaveAttribute('open');
    await expect(section('Popover').querySelector('input[type="hidden"]')).toHaveValue('forest');
    await expect(document.documentElement).toHaveAttribute('data-usx-theme', 'forest');
    await expect(popover.querySelector('[data-usx-theme-value="forest"]')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
  await context.step('Popover aligns its panel to the end', async () => {
    const popover = section('PopoverEnd').querySelector('.usx-theme-picker__popover');
    await userEvent.click(popover.querySelector('summary'));
    const right = popover.querySelector('summary').getBoundingClientRect().right;
    const panelRight = popover.querySelector('.usx-popover__panel').getBoundingClientRect().right;
    await expect(Math.abs(panelRight - right)).toBeLessThan(2);
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
