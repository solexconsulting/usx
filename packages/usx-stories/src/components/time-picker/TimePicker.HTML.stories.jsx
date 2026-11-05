import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/time-picker/time-picker.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/time-picker/time-picker.django-snapshot.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { expect, userEvent, waitFor } from 'storybook/test';
import { storyDefs } from './TimePicker.React.stories.jsx';
import {
  createAllVariantsPlay,
  sectionFor,
  sectionTitle,
  snapshotId,
} from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/TimePicker',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`timePicker.init()`'),
      },
    },
  },
  decorators: [...componentInit('timePicker')],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

const toTime = (hhmm) => {
  const [hours, minutes] = hhmm.split(':').map(Number);
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')}${hours < 12 ? 'am' : 'pm'}`;
};

const checkTimePicker = (def) => async (group) => {
  // USWDS replaces the plain input with a combo box.
  await waitFor(() => expect(group.querySelector('.usa-combo-box[data-enhanced]')).toBeTruthy());
  const combo = group.querySelector('.usa-combo-box');
  const input = combo.querySelector('input.usa-combo-box__input');
  const select = combo.querySelector('select');
  const label = group.querySelector('label');
  const error = group.querySelector('.usa-error-message');

  await expect(input.id).toMatch(snapshotId(def.id));
  await expect(label).toHaveAttribute('for', input.id);
  await expect(label).toHaveTextContent(def.label);
  await expect(label.querySelector('abbr.usx-required') !== null).toBe(Boolean(def.required));
  await expect(group.querySelector('.usa-hint')).toHaveTextContent(def.hint);
  await expect(input).toHaveAttribute('role', 'combobox');
  await expect(select).toHaveAttribute('name', def.name);
  await hasClass(group, 'usa-form-group--error', Boolean(def.error));
  await hasClass(label, 'usa-label--error', Boolean(def.error));
  await hasClass(combo, 'usx-combo-box--error', Boolean(def.error));
  if (def.error) {
    await expect(error).toHaveTextContent(def.error);
    await expect(error).toHaveAttribute('role', 'alert');
  } else {
    await expect(error).toBeNull();
  }

  if (def.disabled) await expect(input).toBeDisabled();
  else await expect(input).toBeEnabled();
  await expect(input.getAttribute('aria-disabled')).toBe(def.ariaDisabled ? 'true' : null);
  await expect(input.required).toBe(Boolean(def.required));

  // Times run from the minimum to the maximum in `step` minute increments (30 by default).
  const step = Number(def.step ?? 30);
  const first = (def.minTime ?? '00:00').split(':').map(Number);
  const last = (def.maxTime ?? '23:30').split(':').map(Number);
  const count = (last[0] * 60 + last[1] - (first[0] * 60 + first[1])) / step + 1;
  const values = [...select.options].map((option) => option.value);
  await expect(values).toHaveLength(count);
  await expect(values[0]).toBe(def.minTime ?? '00:00');
  await expect(values.at(-1)).toBe(def.maxTime ?? '23:30');
  await expect([...select.options][0].textContent).toBe(toTime(values[0]));

  if (def.defaultValue) {
    await expect(input).toHaveValue(def.defaultValue);
    await expect(select).toHaveValue('13:00');
  } else {
    await expect(input).toHaveValue('');
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).filter(([key]) => !key.startsWith('Unenhanced')).map(([key, def]) => [sectionTitle(key), checkTimePicker(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);

  await context.step('Typing and choosing a time', async () => {
    const group = sectionFor(context.canvasElement, sectionTitle('Default'));
    const input = group.querySelector('input.usa-combo-box__input');
    const select = group.querySelector('select');
    const list = group.querySelector('.usa-combo-box__list');

    await userEvent.click(input);
    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'));
    await userEvent.type(input, '2:3');
    // The list is not filtered; the first match is highlighted instead.
    await waitFor(() =>
      expect(list.querySelector('.usa-combo-box__list-option--focused')).toHaveTextContent('2:30am')
    );
    await expect(list.querySelectorAll('li')).toHaveLength(48);

    await userEvent.click(list.querySelector('.usa-combo-box__list-option--focused'));
    await expect(input).toHaveValue('2:30am');
    await expect(select).toHaveValue('02:30');
    await expect(input).toHaveAttribute('aria-expanded', 'false');

    // The clear button empties both the text and the underlying value.
    await userEvent.click(group.querySelector('.usa-combo-box__clear-input'));
    await expect(input).toHaveValue('');
    await expect(select.value).toBe('');
  });

  await context.step('Disabled pickers do not open', async () => {
    const group = sectionFor(context.canvasElement, sectionTitle('Disabled'));
    const input = group.querySelector('input.usa-combo-box__input');
    await userEvent.click(input);
    await expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  // The contract says aria-disabled does not prevent interaction, and USWDS only blocks `disabled`.
  await context.step('Aria-disabled pickers still open', async () => {
    const group = sectionFor(context.canvasElement, sectionTitle('Aria Disabled'));
    const input = group.querySelector('input.usa-combo-box__input');
    await userEvent.click(input);
    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'));
  });
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: {
        code: reactSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />;
  },
  play,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: {
    docs: {
      source: {
        code: djangoSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />;
  },
  play,
};
