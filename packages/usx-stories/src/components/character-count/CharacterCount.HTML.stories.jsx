import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/character-count/character-count.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/character-count/character-count.django-snapshot.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { expect, userEvent, waitFor } from 'storybook/test';
import { storyDefs } from './CharacterCount.React.stories.jsx';
import {
  createAllVariantsPlay,
  sectionFor,
  sectionTitle,
  snapshotId,
} from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/CharacterCount',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`characterCount.init()`'),
      },
    },
  },
  decorators: [
    ...componentInit('characterCount', {
      onReady: () => {
        // USWDS only computes a prefilled field's status after an input event.
        document
          .querySelectorAll('.usa-character-count__field')
          .forEach((field) => field.dispatchEvent(new Event('input', { bubbles: true })));
      },
    }),
  ],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);
const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;

// Some sections put a note before the field; the character count is the first thing with the class.
const rootOf = (section) =>
  section.matches('.usa-character-count') ? section : section.nextElementSibling;
const fieldOf = (root) => root.querySelector('.usa-character-count__field');
const statusOf = (root) => root.querySelector('.usa-character-count__status');

const statusText = (max, length) => {
  if (!length) return `${plural(max, 'character')} allowed`;
  return length <= max
    ? `${plural(max - length, 'character')} left`
    : `${plural(length - max, 'character')} over limit`;
};

const checkField = (def) => async (section) => {
  const root = rootOf(section);
  const field = fieldOf(root);
  await waitFor(() => expect(field).toHaveAttribute('data-enhanced', 'true'));

  await expect(field.tagName).toBe(def.textArea ? 'TEXTAREA' : 'INPUT');
  await expect(field).toHaveClass(def.textArea ? 'usa-textarea' : 'usa-input');
  await expect(field.id).toMatch(snapshotId(def.id));
  await expect(root.querySelector('label')).toHaveAttribute('for', field.id);
  await expect(field).toHaveAccessibleName(new RegExp(def.label));
  await expect(root).toHaveAttribute('data-maxlength', String(def.max));
  await expect(field).toHaveAttribute('placeholder', def.placeholder ?? '');
  await expect(field.value).toBe(def.value ?? def.defaultValue ?? '');
  await (def.disabled ? expect(field) : expect(field).not).toBeDisabled();
  await (def.required ? expect(field) : expect(field).not).toBeRequired();
  await expect(root.querySelector('abbr.usx-required') !== null).toBe(Boolean(def.required));

  // The field is described by the count message, then the hint, then the error, in that order.
  const describedBy = [
    `${field.id}-info`,
    def.hint && `${field.id}-hint`,
    def.error && `${field.id}-error`,
  ].filter(Boolean);
  await expect(field.getAttribute('aria-describedby').split(' ')).toEqual(describedBy);
  for (const id of describedBy) await expect(root.querySelector(`[id="${id}"]`)).toBeTruthy();
  if (def.hint)
    await expect(root.querySelector(`[id="${field.id}-hint"]`)).toHaveTextContent(def.hint);

  await hasClass(field, 'usa-input--success', Boolean(def.success));
  // USWDS toggles the error classes by character count on init, which clears them from an error that was
  // set up front (see local-docs/play-test-review.md), so only the markup that survives is checked.
  if (def.error) {
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    await expect(root.querySelector(`[id="${field.id}-error"]`)).toHaveAttribute('role', 'alert');
    await expect(root.querySelector(`[id="${field.id}-error"]`)).toHaveTextContent(def.error);
  } else {
    await expect(field).not.toHaveAttribute('aria-invalid');
  }

  // USWDS does not handle a default value that is already over the limit (see the known-issue note).
  if (!(def.value ?? def.defaultValue) || (def.value ?? def.defaultValue).length <= def.max) {
    await expect(statusOf(root)).toHaveTextContent(
      statusText(def.max, (def.value ?? def.defaultValue ?? '').length)
    );
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).filter(([key]) => !key.startsWith('Unenhanced')).map(([key, def]) => [sectionTitle(key), checkField(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Typing', async () => {
    for (const [title, max] of [
      ['Default', 25],
      ['Text Area', 50],
    ]) {
      const root = rootOf(sectionFor(context.canvasElement, title));
      const field = fieldOf(root);
      const expectStatus = (length) =>
        waitFor(() => expect(statusOf(root)).toHaveTextContent(statusText(max, length)));
      await userEvent.type(field, 'hello');
      await expectStatus(5);
      await expect(statusOf(root)).not.toHaveClass('usa-character-count__status--invalid');
      // The screen-reader status is debounced, so it can trail the visible one.
      await waitFor(
        () =>
          expect(root.querySelector('.usa-character-count__sr-status')).toHaveTextContent(
            statusText(max, 5)
          ),
        { timeout: 3000 }
      );

      // Going over the limit is allowed but flagged, and clearing the field resets the message.
      await userEvent.type(field, 'x'.repeat(max));
      await expectStatus(max + 5);
      await expect(statusOf(root)).toHaveClass('usa-character-count__status--invalid');
      await expect(field).toHaveClass('usa-input--error');
      await userEvent.clear(field);
      await expectStatus(0);
      await expect(field).not.toHaveClass('usa-input--error');
    }
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
