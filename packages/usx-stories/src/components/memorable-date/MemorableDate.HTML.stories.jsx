import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/memorable-date/memorable-date.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/memorable-date/memorable-date.django-snapshot.html?raw';
import { expect, userEvent } from 'storybook/test';
import { storyDefs } from './MemorableDate.React.stories.jsx';
import {
  createAllVariantsPlay,
  sectionFor,
  sectionTitle,
  snapshotId,
} from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/MemorableDate',
  tags: ['USWDS', 'autodocs'],
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);
const fieldsOf = (group) => ({
  month: group.querySelector('.usa-form-group--month select'),
  day: group.querySelector('.usa-form-group--day input'),
  year: group.querySelector('.usa-form-group--year input'),
});

const checkDate = (def) => async (group) => {
  await expect(group).toHaveClass('usa-form-group', 'usx-form-group');
  await hasClass(group, 'usa-form-group--error', Boolean(def.error));
  const fieldset = group.querySelector('fieldset');
  await expect(fieldset).toHaveAccessibleName(/Date of Birth$/);
  await expect(fieldset.querySelector('legend').querySelector('abbr.usx-required') !== null).toBe(
    Boolean(def.required)
  );
  await hasClass(fieldset.querySelector('legend'), 'usa-label--error', Boolean(def.error));

  const { month, day, year } = fieldsOf(group);
  // Month is a menu of the twelve months, day and year are short numeric fields, in that order.
  await expect([...month.options].map((option) => option.textContent.trim())).toEqual([
    '- Select -',
    ...MONTHS,
  ]);
  await expect(day).toHaveAttribute('maxlength', '2');
  await expect(year).toHaveAttribute('maxlength', '4');
  for (const field of [day, year]) {
    await expect(field).toHaveAttribute('inputmode', 'numeric');
    await expect(field).toHaveAttribute('pattern', '[0-9]*');
  }
  const [monthRect, dayRect, yearRect] = [month, day, year].map((field) =>
    field.getBoundingClientRect()
  );
  await expect(monthRect.right).toBeLessThanOrEqual(dayRect.left + 1);
  await expect(dayRect.right).toBeLessThanOrEqual(yearRect.left + 1);

  for (const [name, field] of Object.entries({ month, day, year })) {
    await expect(field.id).toMatch(snapshotId(`${def.id}-${name}`));
    await expect(field).toHaveAttribute('name', `${def.id}-${name}`);
    await expect(field).toHaveAccessibleName(
      new RegExp(`${name[0].toUpperCase()}${name.slice(1)}$`)
    );
    await (def.disabled ? expect(field) : expect(field).not).toBeDisabled();
    await (def.required ? expect(field) : expect(field).not).toBeRequired();
    // aria-disabled keeps the field focusable and in the tab order.
    if (def.ariaDisabled) await expect(field).toHaveAttribute('aria-disabled', 'true');
    else await expect(field).not.toHaveAttribute('aria-disabled');
    await hasClass(field, 'usa-input--error', Boolean(def.error));
  }

  await expect(month.value).toBe(def.month ?? def.defaultMonth ?? '');
  await expect(day.value).toBe(def.day ?? def.defaultDay ?? '');
  await expect(year.value).toBe(def.year ?? def.defaultYear ?? '');

  const message = group.querySelector('.usa-error-message');
  if (def.error) {
    await expect(message).toHaveAttribute('role', 'alert');
    await expect(message).toHaveTextContent(def.error);
  } else {
    await expect(message).toBeNull();
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkDate(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Entering a date', async () => {
    const { month, day, year } = fieldsOf(sectionFor(context.canvasElement, 'Default'));
    await userEvent.selectOptions(month, 'May');
    await userEvent.type(day, '22');
    await userEvent.type(year, '19901234');
    await expect(month.value).toBe('5');
    await expect(day).toHaveValue('22');
    // The year stops at four digits.
    await expect(year).toHaveValue('1990');
    const disabled = fieldsOf(sectionFor(context.canvasElement, 'Disabled'));
    await userEvent.type(disabled.day, '1');
    await expect(disabled.day).toHaveValue('');
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
