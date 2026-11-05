import React from 'react';
import IndeterminateHost from './IndeterminateHost.jsx';
import reactSnapshot from '../../../../usx-react/src/components/switch/switch.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/switch/switch.django-snapshot.html?raw';
import { expect, waitFor } from 'storybook/test';
import { storyDefs } from './Switch.React.stories.jsx';
import { checkCheckbox, checkToggle } from '../checkbox/checkCheckbox.js';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Switch',
  tags: ['USX', 'autodocs'],
};

const checkDef =
  (def, isIndeterminate = false) =>
  async (first) => {
    const grouped = def.formGroup !== false;
    const box = grouped ? first.querySelector('.usa-checkbox') : first;
    const messageFor = (selector) =>
      grouped
        ? first.querySelector(selector)
        : first.nextElementSibling?.matches(selector)
          ? first.nextElementSibling
          : null;

    await (grouped ? expect(first) : expect(first).not).toHaveClass(
      'usa-form-group',
      'usx-form-group'
    );
    await expect(box).toHaveClass('usa-checkbox', 'usx-checkbox', 'usx-switch');
    if (def.className) await expect(box).toHaveClass(def.className);
    if (def.color) {
      await expect(box.querySelector('.usa-checkbox__label')).toHaveClass(`before-${def.color}`);
      await expect(box).not.toHaveClass(`before-${def.color}`);
    }
    await checkCheckbox(box, def);

    const input = box.querySelector('input');
    if (def.ariaLabel) await expect(input).toHaveAccessibleName(def.ariaLabel);
    if (isIndeterminate) await waitFor(() => expect(input.indeterminate).toBe(true));

    const error = messageFor('.usa-error-message');
    if (def.error) {
      await expect(error).toHaveAttribute('role', 'alert');
      await expect(error).toHaveTextContent(def.error);
    } else await expect(error).toBeNull();
    if (grouped)
      await (def.error ? expect(first) : expect(first).not).toHaveClass('usa-form-group--error');

    const success = messageFor('.usa-success-message');
    if (def.success) {
      await expect(success).toHaveAttribute('role', 'status');
      await expect(success).toHaveTextContent(def.success);
    } else await expect(success).toBeNull();
  };

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [
    sectionTitle(key),
    checkDef(def, key === 'Indeterminate'),
  ])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);

  await context.step('Checkbox colors and switch geometry', async () => {
    const label = (key) =>
      sectionFor(context.canvasElement, sectionTitle(key)).querySelector('.usa-checkbox__label');
    const track = (key) => getComputedStyle(label(key), '::before');
    const reference = document.createElement('div');
    reference.className = 'usa-checkbox usx-checkbox';
    reference.innerHTML =
      '<input class="usa-checkbox__input" id="switch-color-reference" type="checkbox"><label class="usa-checkbox__label" for="switch-color-reference">Reference</label>';
    context.canvasElement.append(reference);
    const referenceInput = reference.querySelector('input');
    const referenceLabel = reference.querySelector('label');
    const themeOverrides = {
      '--usx-checkable-bg': '#f0c',
      '--usx-checkable-border': '#0a0',
      '--usx-color-primary': '#c00',
    };

    try {
      const height = parseFloat(track('Default').height);
      const thumbSize = parseFloat(track('Default').backgroundSize);
      await expect(parseFloat(track('Default').width)).toBeGreaterThan(height);
      await expect(thumbSize).toBeGreaterThanOrEqual(height - 4);
      await expect(parseFloat(track('Small').backgroundSize)).toBeGreaterThanOrEqual(
        parseFloat(track('Small').height) - 4
      );
      await expect(parseFloat(track('Small').width)).toBeLessThan(
        parseFloat(track('Default').width)
      );
      await expect(parseFloat(getComputedStyle(label('Tile')).paddingLeft)).toBeGreaterThan(
        parseFloat(getComputedStyle(label('Default')).paddingLeft)
      );
      await expect(track('Default').borderRadius).not.toBe('2px');

      const compareColors = async () => {
        for (const [key, checked, disabled] of [
          ['Default', false, false],
          ['Checked', true, false],
          ['Disabled', false, true],
          ['DisabledChecked', true, true],
        ]) {
          referenceInput.checked = checked;
          referenceInput.disabled = disabled;
          const referenceTrack = getComputedStyle(referenceLabel, '::before');
          await expect(track(key).backgroundColor).toBe(referenceTrack.backgroundColor);
          await expect(track(key).boxShadow).toBe(referenceTrack.boxShadow);
        }
      };

      await compareColors();

      // Color utilities apply to the checked Switch track, including tile,
      // while the same classes leave its unchecked and disabled colors alone.
      const colorCases = [
        ['ColorSuccess', 'success'],
        ['ColorWarning', 'warning'],
        ['ColorError', 'error'],
        ['ColorSecondaryTile', 'secondary'],
        ['ColorAccentCool', 'accent-cool'],
      ];
      const probe = document.createElement('div');
      context.canvasElement.append(probe);
      try {
        for (const [key, color] of colorCases) {
          probe.className = `bg-${color}`;
          const expected = getComputedStyle(probe).backgroundColor;
          await waitFor(() => expect(track(key).backgroundColor).toBe(expected));
          await expect(track(key).boxShadow).toContain(expected);
        }
      } finally {
        probe.remove();
      }
      // A colored Switch returns to the shared off appearance after toggling.
      sectionFor(context.canvasElement, sectionTitle('ColorSuccess'))
        .querySelector('label')
        .click();
      await waitFor(() =>
        expect(track('ColorSuccess').backgroundColor).toBe(track('Default').backgroundColor)
      );
      await expect(track('ColorSuccess').boxShadow).toBe(track('Default').boxShadow);
      await expect(track('ColorSuccess').backgroundImage).toBe(track('Default').backgroundImage);
      await expect(track('ColorDisabledChecked').backgroundColor).toBe(
        track('DisabledChecked').backgroundColor
      );
      await expect(track('ColorDisabledChecked').boxShadow).toBe(
        track('DisabledChecked').boxShadow
      );

      // A color class on Checkbox or Radio Buttons must not recolor their control.
      referenceInput.checked = true;
      referenceInput.disabled = false;
      const checkboxColor = getComputedStyle(referenceLabel, '::before').backgroundColor;
      reference.classList.add('before-error');
      await expect(getComputedStyle(referenceLabel, '::before').backgroundColor).toBe(
        checkboxColor
      );
      const radio = document.createElement('div');
      radio.className = 'usa-radio';
      radio.innerHTML =
        '<input class="usa-radio__input" id="switch-radio-reference" type="radio" checked><label class="usa-radio__label" for="switch-radio-reference">Reference</label>';
      context.canvasElement.append(radio);
      try {
        const radioLabel = radio.querySelector('label');
        const radioColor = getComputedStyle(radioLabel, '::before').backgroundColor;
        radio.classList.add('before-error');
        await expect(getComputedStyle(radioLabel, '::before').backgroundColor).toBe(radioColor);
      } finally {
        radio.remove();
      }

      for (const [name, value] of Object.entries(themeOverrides))
        context.canvasElement.style.setProperty(name, value);
      await waitFor(compareColors);
      await expect(track('Default').backgroundColor).toBe('rgb(255, 0, 204)');
      await expect(track('Default').backgroundImage).toContain('rgb(0, 170, 0)');
    } finally {
      for (const name of Object.keys(themeOverrides))
        context.canvasElement.style.removeProperty(name);
      reference.remove();
    }
  });

  await context.step('Native checkbox interaction', async () => {
    for (const [key, def] of Object.entries(storyDefs)) {
      const first = sectionFor(context.canvasElement, sectionTitle(key));
      await checkToggle(first.querySelector('.usa-checkbox') ?? first, Boolean(def.disabled));
    }
  });
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => (
    <IndeterminateHost idSuffix={storyDefs.Indeterminate.id}>
      <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />
    </IndeterminateHost>
  ),
  play,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => (
    <IndeterminateHost idSuffix={storyDefs.Indeterminate.id}>
      <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />
    </IndeterminateHost>
  ),
  play,
};
