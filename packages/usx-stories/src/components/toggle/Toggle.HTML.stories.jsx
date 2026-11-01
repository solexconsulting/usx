import React from 'react';
import { expect, userEvent, within } from 'storybook/test';
import reactSnapshot from '../../../../usx-react/src/components/toggle/toggle.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/toggle/toggle.django-snapshot.html?raw';
import { storyDefs } from './Toggle.React.stories.jsx';
import { createAllVariantsPlay, sectionElements, sectionFor, snapshotId } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS-Inspired/Toggle',
  tags: ['USWDS-Inspired', 'autodocs'],
  decorators: [(Story) => {
    React.useEffect(() => {
      const onChange = (event) => {
        const group = event.target.closest('ul.usx-toggle');
        if (!group?.id.endsWith('controlled-toggle')) return;
        const readout = group.nextElementSibling;
        if (readout?.tagName === 'P') readout.textContent = `Selected: ${event.target.value}`;
      };
      document.addEventListener('change', onChange);
      return () => document.removeEventListener('change', onChange);
    }, []);
    return <Story />;
  }],
};

const checkToggle = (def) => async (section) => {
  const group = section.matches('ul.usx-toggle') ? section : section.querySelector('ul.usx-toggle');
  await expect(group).not.toBeNull();
  await expect(group.id).toMatch(snapshotId(def.id));
  await expect(group).toHaveAttribute('role', 'radiogroup');
  await expect(group).toHaveAccessibleName(def.ariaLabel);
  await (def.variant === 'icon' ? expect(group) : expect(group).not).toHaveClass('usx-toggle--icon');
  if (def.disabled) await expect(group).toHaveAttribute('aria-disabled', 'true');
  else await expect(group).not.toHaveAttribute('aria-disabled');
  if (def.required) await expect(group).toHaveAttribute('aria-required', 'true');
  else await expect(group).not.toHaveAttribute('aria-required');

  const items = [...group.querySelectorAll(':scope > li.usa-button-group__item')];
  await expect(items).toHaveLength(def.options.length);
  const selected = def.value ?? def.defaultValue;
  for (const [index, item] of items.entries()) {
    const rawOption = def.options[index];
    const option = typeof rawOption === 'object' ? rawOption : { value: rawOption, label: rawOption };
    const optionValue = option.value ?? option.label ?? index;
    const optionLabel = String(option.label ?? optionValue);
    const value = String(optionValue);
    const input = item.querySelector('input[type="radio"]');
    const label = item.querySelector('label.usx-toggle__button');
    await expect(input.id).toMatch(snapshotId(`${def.id}-option-${index}`));
    await expect(input).toHaveAttribute('name', def.name ?? def.id);
    await expect(input).toHaveAttribute('value', value);
    await expect(input).toHaveAccessibleName(optionLabel);
    await expect(label).toHaveAttribute('for', input.id);
    await expect(label.querySelector('span')).toHaveTextContent(optionLabel);
    await expect(input.checked).toBe(selected === optionValue);
    await expect(input.disabled).toBe(Boolean(def.disabled || option.disabled));
    await expect(input.required).toBe(Boolean(def.required));
    if (option.icon) {
      await expect(label).toHaveAttribute('title', optionLabel);
      await expect(label.querySelector('span')).toHaveClass('usa-sr-only');
      const icon = label.querySelector('svg.usx-toggle__icon');
      await expect(icon).toHaveAttribute('aria-hidden', 'true');
      await expect(icon.querySelector('use').getAttribute('href')).toMatch(new RegExp(`#${option.icon}$`));
    } else {
      await expect(label.querySelector('svg')).toBeNull();
    }
  }
};

const checks = {
  Default: checkToggle(storyDefs.Default),
  Icon: checkToggle(storyDefs.IconVariant),
  'Totally Disabled': checkToggle(storyDefs.TotallyDisabled),
  'Partially Disabled': checkToggle(storyDefs.PartiallyDisabled),
  Required: checkToggle(storyDefs.Required),
  Numeric: checkToggle(storyDefs.Numeric),
  'Primitive Options': checkToggle(storyDefs.PrimitiveOptions),
};

const testPartiallyDisabled = async ({ canvasElement }) => {
  const scope = within(sectionFor(canvasElement, 'Partially Disabled'));
  const first = scope.getByRole('radio', { name: 'Option 1' });
  await userEvent.click(scope.getByText('Option 1', { selector: 'span' }));
  await expect(first).toHaveFocus();
  await userEvent.keyboard('{ArrowRight}');
  await expect(scope.getByRole('radio', { name: 'Option 3' })).toBeChecked();
  await expect(scope.getByRole('radio', { name: 'Option 2' })).toBeDisabled();
  await userEvent.keyboard('{ArrowRight}');
  await expect(first).toBeChecked();
};

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  if ([...context.canvasElement.querySelectorAll('h3.site-preview-heading')].some((heading) => heading.textContent === 'Controlled')) {
    const [group, readout] = sectionElements(context.canvasElement, 'Controlled');
    await context.step('Controlled initial state', async () => {
      await checkToggle(storyDefs.Controlled)(group);
      await expect(readout).toHaveTextContent('Selected: option2');
    });
    await context.step('Controlled example readout', async () => {
      await userEvent.click(within(group).getByText('Option 1', { selector: 'span' }));
      await expect(within(group).getByRole('radio', { name: 'Option 1' })).toBeChecked();
      await expect(readout).toHaveTextContent('Selected: option1');
    });
  }
  await context.step('Native selection and disabled options', async () => {
    const defaultGroup = within(sectionFor(context.canvasElement, 'Default'));
    await userEvent.click(defaultGroup.getByText('Left', { selector: 'span' }));
    await expect(defaultGroup.getByRole('radio', { name: 'Left' })).toBeChecked();
    await expect(defaultGroup.getByRole('radio', { name: 'Center' })).not.toBeChecked();

    const iconGroup = within(sectionFor(context.canvasElement, 'Icon'));
    await userEvent.click(iconGroup.getByText('Bike', { selector: 'span' }));
    await expect(iconGroup.getByRole('radio', { name: 'Bike' })).toBeChecked();

    const numericGroup = within(sectionFor(context.canvasElement, 'Numeric'));
    await userEvent.click(numericGroup.getByText('25', { selector: 'span' }));
    await expect(numericGroup.getByRole('radio', { name: '25' })).toBeChecked();

    const primitiveGroup = within(sectionFor(context.canvasElement, 'Primitive Options'));
    await userEvent.click(primitiveGroup.getByText('5', { selector: 'span' }));
    await expect(primitiveGroup.getByRole('radio', { name: '5' })).toBeChecked();

    const disabledGroup = sectionFor(context.canvasElement, 'Totally Disabled');
    await expect([...disabledGroup.querySelectorAll('input:checked')]).toHaveLength(0);
    await testPartiallyDisabled(context);
  });
  await context.step('Required form validation and reset', async () => {
    const form = sectionFor(context.canvasElement, 'Required');
    await expect(form.checkValidity()).toBe(false);
    await userEvent.click(within(form).getByText('Email', { selector: 'span' }));
    await expect(form.checkValidity()).toBe(true);
    await userEvent.click(within(form).getByRole('button', { name: 'Reset' }));
    await expect([...form.querySelectorAll('input:checked')]).toHaveLength(0);
    await expect(form.checkValidity()).toBe(false);
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
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
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
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play,
};
