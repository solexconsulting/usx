import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/date-range-picker/date-range-picker.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/date-range-picker/date-range-picker.django-snapshot.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { expect, userEvent, waitFor } from 'storybook/test';
import { storyDefs } from './DateRangePicker.React.stories.jsx';
import {
  createAllVariantsPlay,
  sectionFor,
  sectionTitle,
  snapshotId,
} from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/DateRangePicker',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`datePicker.init()` and `dateRangePicker.init()`'),
      },
    },
  },
  decorators: [...componentInit('datePicker', 'dateRangePicker')],
};

const toDisplay = (iso) => iso.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$2/$3/$1');
const isReady = (range) => range.querySelectorAll('.usa-date-picker__external-input').length === 2;

// The script replaces each calendar element when it opens, so those are looked up fresh.
const partsOf = (range) => {
  const [start, end] = [...range.querySelectorAll('.usa-date-picker')];
  const parts = (picker) => ({
    group: picker.closest('.usa-form-group'),
    external: picker.querySelector('.usa-date-picker__external-input'),
    internal: picker.querySelector('.usa-date-picker__internal-input'),
    toggle: picker.querySelector('.usa-date-picker__button'),
    calendar: () => picker.querySelector('.usa-date-picker__calendar'),
  });
  return { start: parts(start), end: parts(end) };
};

const readyParts = async (context, title) => {
  const range = sectionFor(context.canvasElement, title);
  await waitFor(() => expect(isReady(range)).toBe(true));
  return partsOf(range);
};

const checkRange = (def) => async (range) => {
  await waitFor(() => expect(isReady(range)).toBe(true));
  await expect(range).toHaveClass('usa-date-range-picker', 'usx-date-range-picker');
  const { start, end } = partsOf(range);
  await expect(range.querySelector('.usa-date-range-picker__range-start')).toBeTruthy();
  await expect(range.querySelector('.usa-date-range-picker__range-end')).toBeTruthy();

  const sides = [
    [start, def.startId, def.startLabel, def.startHint, def.startError, def.defaultStartDate],
    [end, def.endId, def.endLabel, def.endHint, def.endError, def.defaultEndDate],
  ];
  for (const [side, id, label, hint, error, defaultValue] of sides) {
    await expect(side.external.id).toMatch(snapshotId(id));
    await expect(side.external).toHaveAccessibleName(new RegExp(`${label}$`));
    const hintElement = side.group.querySelector('.usa-hint');
    await expect(hintElement).toHaveTextContent(hint);
    await expect(side.external.getAttribute('aria-describedby').split(' ')).toContain(
      hintElement.id
    );
    await (def.disabled ? expect(side.external) : expect(side.external).not).toBeDisabled();
    await (def.disabled ? expect(side.toggle) : expect(side.toggle).not).toBeDisabled();
    await expect(side.group.querySelector('abbr.usx-required') !== null).toBe(
      Boolean(def.required)
    );
    await expect(side.calendar().hidden).toBe(true);
    if (defaultValue) {
      await expect(side.internal.value).toBe(defaultValue);
      await expect(side.external.value).toBe(toDisplay(defaultValue));
    } else {
      await expect(side.external.value).toBe('');
    }
    const message = side.group.querySelector('.usa-error-message');
    if (error) {
      await expect(message).toHaveAttribute('role', 'alert');
      await expect(message).toHaveTextContent(error);
    } else {
      await expect(message).toBeNull();
    }
  }
  // The start field comes before the end field on the page.
  await expect(
    start.external.compareDocumentPosition(end.external) & Node.DOCUMENT_POSITION_FOLLOWING
  ).toBeTruthy();
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).filter(([key]) => !key.startsWith('Unenhanced')).map(([key, def]) => [sectionTitle(key), checkRange(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);

  await context.step('End date follows the start date', async () => {
    const { start, end } = await readyParts(context, 'Default');
    await userEvent.type(start.external, '05/22/2020');
    await userEvent.tab();
    await expect(start.internal.value).toBe('2020-05-22');
    await userEvent.click(end.toggle);
    await waitFor(() => expect(end.calendar().hidden).toBe(false));
    // Days before the start date cannot end the range; later days can.
    const dates = [...end.calendar().querySelectorAll('.usa-date-picker__calendar__date')];
    for (const date of dates) await expect(date.disabled).toBe(date.dataset.value < '2020-05-22');
    await expect(dates.some((date) => !date.disabled)).toBe(true);
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(end.calendar().hidden).toBe(true));
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
