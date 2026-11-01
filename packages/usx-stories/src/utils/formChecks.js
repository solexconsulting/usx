import { expect } from 'storybook/test';
import { endsWith, snapshotId } from './playHelpers.js';

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

// Checks a labelled form field (input, textarea or select inside a form group) against its props.
export const checkField = async (group, def, { tag, rendersSuccessMessage = false }) => {
  const field = group.querySelector(tag.toLowerCase());
  const label = group.querySelector('label');
  await expect(group).toHaveClass('usa-form-group', 'usx-form-group');
  await expect(field.tagName).toBe(tag);
  await expect(field.id).toMatch(snapshotId(def.id));
  await expect(label).toHaveAttribute('for', field.id);
  await expect(field).toHaveAccessibleName(endsWith(def.label));

  await (def.disabled ? expect(field) : expect(field).not).toBeDisabled();
  await (def.required ? expect(field) : expect(field).not).toBeRequired();
  await expect(label.querySelector('abbr.usx-required') !== null).toBe(Boolean(def.required));
  if (def.placeholder) await expect(field).toHaveAttribute('placeholder', def.placeholder);

  // A screen-reader-only label is moved off-screen but still names the field.
  const labelRect = label.getBoundingClientRect();
  if (def.screenReaderOnlyLabel) await expect(labelRect.right).toBeLessThan(0);
  else await expect(labelRect.left).toBeGreaterThanOrEqual(0);

  // The field is described by its hint and then its error message.
  const hint = group.querySelector('.usa-hint');
  const message = group.querySelector('.usa-error-message');
  const describedBy = [def.hint && hint?.id, typeof def.error === 'string' && message?.id].filter(
    Boolean
  );
  if (def.hint) await expect(hint).toHaveTextContent(def.hint);
  else await expect(hint).toBeNull();
  if (describedBy.length)
    await expect(field.getAttribute('aria-describedby').split(' ')).toEqual(describedBy);
  else await expect(field).not.toHaveAttribute('aria-describedby');

  await hasClass(group, 'usa-form-group--error', Boolean(def.error));
  await hasClass(label, 'usa-label--error', Boolean(def.error));
  await hasClass(field, 'usa-input--error', Boolean(def.error));
  await hasClass(field, 'usa-input--success', Boolean(def.success));
  if (def.error) await expect(field).toHaveAttribute('aria-invalid', 'true');
  else await expect(field).not.toHaveAttribute('aria-invalid');
  if (typeof def.error === 'string') {
    await expect(message).toHaveAttribute('role', 'alert');
    await expect(message).toHaveTextContent(def.error);
  } else {
    await expect(message).toBeNull();
  }
  if (rendersSuccessMessage && typeof def.success === 'string') {
    await expect(group.querySelector('.usa-success-message')).toHaveTextContent(def.success);
  }
};
