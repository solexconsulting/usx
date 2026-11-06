import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/date-picker/date-picker.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/date-picker/date-picker.django-snapshot.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { expect, userEvent, waitFor } from 'storybook/test';
import { storyDefs } from './DatePicker.React.stories.jsx';
import {
  createAllVariantsPlay,
  sectionFor,
  sectionTitle,
  snapshotId,
} from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/DatePicker',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`datePicker.init()`'),
      },
    },
  },
  decorators: [...componentInit('datePicker')],
};

const toDisplay = (iso) => iso.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$2/$3/$1');
const partsOf = (group) => ({
  external: group.querySelector('.usa-date-picker__external-input'),
  internal: group.querySelector('.usa-date-picker__internal-input'),
  toggle: group.querySelector('.usa-date-picker__button'),
  // The script replaces the calendar element whenever it opens, so look it up fresh.
  calendar: () => group.querySelector('.usa-date-picker__calendar'),
});

const checkPicker = (def) => async (group) => {
  await waitFor(() => expect(group.querySelector('.usa-date-picker__external-input')).toBeTruthy());
  const { external, internal, toggle, calendar: getCalendar } = partsOf(group);
  const calendar = getCalendar();
  await expect(group).toHaveClass('usa-form-group', 'usx-form-group');

  // The visible field keeps the id and name; the script's hidden input holds the ISO value.
  await expect(external.id).toMatch(snapshotId(def.id));
  await expect(external).toHaveAttribute('name', def.name);
  await expect(external).toHaveAccessibleName(new RegExp(`${def.label}$`));
  const hint = group.querySelector('.usa-hint');
  await expect(hint).toHaveTextContent(def.hint);
  await expect(external.getAttribute('aria-describedby').split(' ')).toContain(hint.id);
  await expect(internal).not.toBeVisible();

  await (def.disabled ? expect(external) : expect(external).not).toBeDisabled();
  await (def.disabled ? expect(toggle) : expect(toggle).not).toBeDisabled();
  await expect(group.querySelector('abbr.usx-required') !== null).toBe(Boolean(def.required));
  if (def.required) await expect([external, internal].some((input) => input.required)).toBe(true);

  await expect(toggle).toHaveAccessibleName('Toggle calendar');
  await expect(calendar).toBeEmptyDOMElement();
  await expect(calendar.hidden).toBe(true);

  if (def.value ?? def.defaultValue) {
    await expect(internal.value).toBe(def.value ?? def.defaultValue);
    await expect(external.value).toBe(toDisplay(def.value ?? def.defaultValue));
  } else {
    await expect(external.value).toBe('');
  }

  const error = group.querySelector('.usa-error-message');
  if (def.error) {
    await expect(error).toHaveAttribute('role', 'alert');
    await expect(error).toHaveTextContent(def.error);
  } else {
    await expect(error).toBeNull();
  }
};

const readyParts = async (context, title) => {
  const group = sectionFor(context.canvasElement, title);
  await waitFor(() => expect(group.querySelector('.usa-date-picker__external-input')).toBeTruthy());
  return partsOf(group);
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).filter(([key]) => !key.startsWith('Unenhanced')).map(([key, def]) => [sectionTitle(key), checkPicker(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);

  await context.step('Typing a date', async () => {
    const { external, internal } = await readyParts(context, 'Default');
    await userEvent.type(external, '05/22/2020');
    await userEvent.tab();
    await expect(internal.value).toBe('2020-05-22');
  });

  await context.step('Choosing from the calendar', async () => {
    const {
      external,
      internal,
      toggle,
      calendar: getCalendar,
    } = await readyParts(context, 'Required');
    await userEvent.click(toggle);
    await waitFor(() => expect(getCalendar().hidden).toBe(false));
    await expect(
      getCalendar().querySelector('.usa-date-picker__calendar__date--focused')
    ).toBeTruthy();
    await userEvent.click(getCalendar().querySelector('.usa-date-picker__calendar__date--focused'));
    await waitFor(() => expect(getCalendar().hidden).toBe(true));
    await expect(external.value).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    await expect(internal.value).toBe(
      external.value.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, '$3-$1-$2')
    );
  });

  await context.step('Keeping within min and max', async () => {
    const def = storyDefs.MinMaxDate;
    const { toggle, calendar: getCalendar } = await readyParts(context, 'Min Max Date');
    await userEvent.click(toggle);
    await waitFor(() => expect(getCalendar().hidden).toBe(false));
    const dates = [...getCalendar().querySelectorAll('.usa-date-picker__calendar__date')];
    await expect(dates.length).toBeGreaterThan(0);
    // Days outside the range cannot be chosen; days inside can.
    for (const date of dates) {
      const inside = date.dataset.value >= def.minDate && date.dataset.value <= def.maxDate;
      await expect(date.disabled).toBe(!inside);
    }
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(getCalendar().hidden).toBe(true));
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
