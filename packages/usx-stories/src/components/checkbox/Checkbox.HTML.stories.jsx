import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/checkbox/checkbox.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/checkbox/checkbox.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Checkbox.React.stories.jsx';
import { checkCheckbox, checkToggle } from './checkCheckbox.js';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Checkbox',
  tags: ['USWDS', 'autodocs'],
};

const checkDef = (def) => async (first) => {
  // Without a form group the checkbox and its message are siblings.
  const grouped = def.formGroup !== false;
  const box = grouped ? first.querySelector('.usa-checkbox') : first;
  const messageFor = (selector) =>
    grouped
      ? first.querySelector(selector)
      : ([first.nextElementSibling].find((sibling) => sibling?.matches(selector)) ?? null);
  if (grouped) await expect(first).toHaveClass('usa-form-group', 'usx-form-group');
  else await expect(first).toHaveClass('usa-checkbox');
  await checkCheckbox(box, def);

  const error = messageFor('.usa-error-message');
  if (def.error) {
    await expect(error).toHaveAttribute('role', 'alert');
    await expect(error).toHaveTextContent(def.error);
  } else {
    await expect(error).toBeNull();
  }
  if (grouped)
    await (def.error ? expect(first) : expect(first).not).toHaveClass('usa-form-group--error');

  const success = messageFor('.usa-success-message');
  if (def.success) {
    await expect(success).toHaveAttribute('role', 'status');
    await expect(success).toHaveTextContent(def.success);
  } else {
    await expect(success).toBeNull();
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkDef(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Toggling', async () => {
    for (const [key, def] of Object.entries(storyDefs)) {
      const first = sectionFor(context.canvasElement, sectionTitle(key));
      await checkToggle(first.querySelector('.usa-checkbox') ?? first, Boolean(def.disabled));
    }
  });
  await context.step('Small is smaller', async () => {
    // The box itself is drawn on the label's ::before.
    const boxSize = (key) =>
      parseFloat(
        getComputedStyle(
          sectionFor(context.canvasElement, sectionTitle(key)).querySelector('label'),
          '::before'
        ).width
      );
    await expect(boxSize('Small')).toBeLessThan(boxSize('Default'));
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
