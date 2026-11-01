import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/radio-buttons/radio-buttons.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/radio-buttons/radio-buttons.django-snapshot.html?raw';
import { expect, userEvent } from 'storybook/test';
import { storyDefs } from './RadioButtons.React.stories.jsx';
import {
  createAllVariantsPlay,
  sectionFor,
  sectionTitle,
  snapshotId,
} from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/RadioButtons',
  tags: ['USWDS', 'autodocs'],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

const checkRadios = (def) => async (formGroup) => {
  await expect(formGroup).toHaveClass('usa-form-group', 'usx-form-group');
  const fieldset = formGroup.querySelector('fieldset');
  await expect(fieldset.id).toMatch(snapshotId(def.id));
  await expect(fieldset).toHaveAccessibleName();

  // The group owns the form group, hint and error; the radios inside render without their own.
  await expect(formGroup.querySelectorAll('.usa-form-group')).toHaveLength(0);
  const message = fieldset.querySelector('.usa-error-message');
  await hasClass(formGroup, 'usa-form-group--error', Boolean(def.error));
  await hasClass(fieldset.querySelector('legend'), 'usa-label--error', Boolean(def.error));
  if (def.error) {
    await expect(message).toHaveAttribute('role', 'alert');
    await expect(message).toHaveTextContent(def.error);
  } else {
    await expect(message).toBeNull();
  }
  if (def.hint) await expect(fieldset.querySelector('.usa-hint')).toHaveTextContent(def.hint);

  const radios = [...fieldset.querySelectorAll('.usa-radio')];
  await expect(radios).toHaveLength(def.options.length);
  for (const [index, option] of def.options.entries()) {
    const input = radios[index].querySelector('input');
    const label = radios[index].querySelector('label');
    await expect(input).toHaveAttribute('type', 'radio');
    await expect(input.id).toMatch(snapshotId(`${def.id}-${index}`));
    await expect(label).toHaveAttribute('for', input.id);
    await expect(input).toHaveAttribute('name', def.name);
    await expect(input).toHaveAttribute('value', option.value);
    await expect(input).toHaveAccessibleName(new RegExp(option.label));
    await (option.disabled ? expect(input) : expect(input).not).toBeDisabled();
    await (def.defaultValue === option.value ? expect(input) : expect(input).not).toBeChecked();
    await hasClass(input, 'usa-radio__input--tile', Boolean(def.tile));
    await hasClass(radios[index], 'usx-radio--small', Boolean(def.small));
    // A custom class goes on each radio item.
    if (def.className) await expect(radios[index]).toHaveClass(...def.className.split(' '));
    const description = label.querySelector('[class*="label-description"]');
    if (option.description) await expect(description).toHaveTextContent(option.description);
    else await expect(description).toBeNull();
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkRadios(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Choosing', async () => {
    const group = sectionFor(context.canvasElement, 'Default');
    const [first, second, , disabled] = [...group.querySelectorAll('input')];
    await userEvent.click(group.querySelectorAll('label')[0]);
    await expect(first).toBeChecked();
    // Only one radio in a group is chosen at a time.
    await userEvent.click(group.querySelectorAll('label')[1]);
    await expect(second).toBeChecked();
    await expect(first).not.toBeChecked();
    await userEvent.click(group.querySelectorAll('label')[3]);
    await expect(disabled).not.toBeChecked();
    await expect(second).toBeChecked();
    // Arrow keys move the choice within the group, skipping the disabled radio.
    second.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect([...group.querySelectorAll('input')][2]).toBeChecked();
    await userEvent.keyboard('{ArrowDown}');
    await expect(first).toBeChecked();
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
