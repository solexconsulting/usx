import { expect, userEvent } from 'storybook/test';
import { snapshotId } from '../../utils/playHelpers.js';

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

// Checks one `.usa-checkbox` against its props. `tile` and `small` may come from the surrounding group.
export const checkCheckbox = async (box, def, { id, name, tile, small } = {}) => {
  const input = box.querySelector('input.usa-checkbox__input');
  const label = box.querySelector('label.usa-checkbox__label');
  await expect(input).toHaveAttribute('type', 'checkbox');
  await expect(input.id).toMatch(snapshotId(id ?? def.id));
  await expect(label).toHaveAttribute('for', input.id);
  await expect(input).toHaveAttribute('name', name ?? def.name);
  await expect(input).toHaveAttribute('value', def.value);
  await expect(input).toHaveAccessibleName(new RegExp(def.label));
  const text = label.cloneNode(true);
  text.querySelectorAll('.usa-checkbox__label-description, abbr').forEach((node) => node.remove());
  await expect(text.textContent.trim()).toBe(def.label);
  await expect(label.querySelector('abbr.usx-required') !== null).toBe(Boolean(def.required));

  await ((def.checked ?? def.defaultChecked) ? expect(input) : expect(input).not).toBeChecked();
  await (def.disabled ? expect(input) : expect(input).not).toBeDisabled();
  await (def.required ? expect(input) : expect(input).not).toBeRequired();
  await hasClass(input, 'usa-checkbox__input--tile', Boolean(tile ?? def.tile));
  await hasClass(box, 'usx-checkbox--small', Boolean(small ?? def.small));

  const description = label.querySelector('.usa-checkbox__label-description');
  if (def.description) await expect(description).toHaveTextContent(def.description);
  else await expect(description).toBeNull();
};

// Clicking the label toggles an enabled checkbox and leaves a disabled one alone.
export const checkToggle = async (box, disabled) => {
  const input = box.querySelector('input');
  const before = input.checked;
  await userEvent.click(box.querySelector('label'));
  await expect(input.checked).toBe(disabled ? before : !before);
  if (!disabled) {
    input.focus();
    await userEvent.keyboard(' ');
    await expect(input.checked).toBe(before);
  }
};
