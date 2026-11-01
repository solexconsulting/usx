import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/form-group/form-group.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/form-group/form-group.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './FormGroup.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/FormGroup',
  tags: ['USWDS', 'autodocs'],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

// The story wraps an input (which brings its own form group) in a form group.
const checkGroup = (def) => async (outer) => {
  await expect(outer).toHaveClass('usa-form-group', 'usx-form-group');
  await hasClass(outer, 'usa-form-group--error', Boolean(def.error));

  const inner = outer.querySelector(':scope > .usa-form-group');
  const label = inner.querySelector('label');
  const input = inner.querySelector('input');
  await expect(label).toHaveAttribute('for', input.id);
  await expect(input).toHaveAccessibleName(label.textContent.trim());

  await hasClass(inner, 'usa-form-group--error', Boolean(def.error));
  await hasClass(label, 'usa-label--error', Boolean(def.error));
  await hasClass(input, 'usa-input--error', Boolean(def.error));
  const message = inner.querySelector('.usa-error-message');
  if (def.error) {
    await expect(message).toHaveAttribute('role', 'alert');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input.getAttribute('aria-describedby').split(' ')).toContain(message.id);
  } else {
    await expect(message).toBeNull();
    await expect(input).not.toHaveAttribute('aria-invalid');
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkGroup(def)])
);
// Success is set on the input inside, not on the group.
checks['Success State'] = async (outer) => {
  await checkGroup(storyDefs.SuccessState)(outer);
  await expect(outer.querySelector('input')).toHaveClass('usa-input--success');
};

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
