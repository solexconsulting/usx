import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/button/button.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/button/button.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Button.React.stories.jsx';
import { createAllVariantsPlay, sectionElements, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Button',
  tags: ['USWDS', 'autodocs'],
};

const variants = [
  'primary',
  'secondary',
  'accent-cool',
  'accent-warm',
  'base',
  'outline',
  'unstyled',
];
const buttonOf = (section) =>
  section.matches('button') ? section : section.querySelector('button');
const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

// Describes one button from its props; the markup must mirror them exactly.
const checkButton = async (button, def) => {
  await expect(button).toHaveAttribute('type', 'button');
  await expect(button).toHaveClass('usa-button', 'usx-button');
  for (const variant of variants)
    await hasClass(button, `usa-button--${variant}`, def.variant === variant);
  await hasClass(button, 'usa-button--big', def.big);
  await hasClass(button, 'usa-button--inverse', def.inverse);
  await hasClass(button, 'usx-button--ghost', def.ghost);
  if (def.className) await expect(button).toHaveClass(def.className);

  // Native `disabled` removes the button from the tab order; aria-disabled keeps it focusable.
  const ariaDisabled = Boolean(def['aria-disabled']);
  if (def.disabled) {
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  } else {
    await expect(button).toBeEnabled();
    if (ariaDisabled) await expect(button).toHaveAttribute('aria-disabled', 'true');
    else await expect(button).not.toHaveAttribute('aria-disabled');
  }
  button.focus();
  await expect(button.ownerDocument.activeElement === button).toBe(!def.disabled);
  button.blur();

  // Content in order: spinner, left icons, label, right icons.
  const icons = def.iconProps ?? [];
  const expected = [
    ...(def.loading ? ['spinner'] : []),
    ...icons
      .filter((icon) => (icon.position ?? 'left') === 'left')
      .map((icon) => `icon:${icon.name}`),
    `text:${def.label}`,
    ...icons.filter((icon) => icon.position === 'right').map((icon) => `icon:${icon.name}`),
  ];
  const actual = [...button.childNodes]
    .filter((node) => node.nodeType !== 3 || node.textContent.trim())
    .map((node) =>
      node.nodeType === 3
        ? `text:${node.textContent.trim()}`
        : node.matches('svg')
          ? `icon:${node.querySelector('use').getAttribute('href').split('#')[1]}`
          : 'spinner'
    );
  await expect(actual).toEqual(expected);
  if (def.loading)
    await expect(button.querySelector('.usx-spinner')).toHaveAttribute('role', 'status');
};

const checkDef = (def) => async (section) => {
  await checkButton(buttonOf(section), def);
  // Inverse buttons only make sense on an inverse surface.
  if (def.inverse)
    await expect(section.closest('.bg-surface-inverse') ?? section).toHaveClass(
      'bg-surface-inverse'
    );
};

// The overview groups buttons by variant, then by state; the state is read from each button's label.
const groups = {
  Primary: { variant: 'primary' },
  Secondary: { variant: 'secondary' },
  'Accent Cool': { variant: 'accent-cool' },
  'Accent Warm': { variant: 'accent-warm' },
  Base: { variant: 'base' },
  Outline: { variant: 'outline' },
  'Outline Inverse': { variant: 'outline', inverse: true },
  Big: { big: true },
  Unstyled: { variant: 'unstyled' },
};
const states = {
  Default: {},
  Hover: { className: 'usa-button--hover' },
  Active: { className: 'usa-button--active' },
  Focus: { className: 'usa-focus' },
  Disabled: { disabled: true },
  'aria-disabled': { 'aria-disabled': true },
};

const checkAllVariants = async (_section, { canvasElement }) => {
  const elements = sectionElements(canvasElement, 'All Variants');
  let seen = 0;
  for (const heading of elements.filter((element) => element.tagName === 'H3')) {
    const group = groups[heading.textContent];
    await expect(group).toBeDefined();
    const buttons = [];
    for (
      let el = heading.nextElementSibling;
      el && el.tagName !== 'H3';
      el = el.nextElementSibling
    ) {
      if (el.matches('button')) buttons.push(el);
      else buttons.push(...el.querySelectorAll('button'));
    }
    for (const button of buttons) {
      const label = button.textContent.trim();
      const unstyled = label === 'Unstyled button';
      const def = { ...group, ...(states[label] ?? {}), label };
      if (unstyled) def.variant = 'unstyled';
      await checkButton(button, def);
      if (group.inverse) await expect(button.closest('.bg-surface-inverse')).toBeTruthy();
      seen++;
    }
  }
  await expect(seen).toBe(7 * 6 + 7 + 5 + 6);
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkDef(def)])
);
checks['All Variants'] = checkAllVariants;

const play = createAllVariantsPlay(checks);

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
