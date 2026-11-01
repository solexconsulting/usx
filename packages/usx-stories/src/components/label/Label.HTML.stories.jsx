import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/label/label.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/label/label.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Label.React.stories.jsx';
import { createAllVariantsPlay } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Label',
  tags: ['USWDS', 'autodocs'],
};

// Story export key to section title, where the story sets its own name.
const titles = {
  WithClassOverride1: 'With Class Override (radio button)',
  WithClassOverride2: 'With Class Override (checkbox)',
};
const titleOf = (key) => titles[key] ?? key.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

const checkLabel = (def) => async (label) => {
  await expect(label.tagName).toBe('LABEL');
  if (def.classOverride) {
    // An override replaces the base label classes rather than adding to them.
    await expect([...label.classList]).toEqual(def.className.split(' '));
  } else {
    await expect(label).toHaveClass('usa-label', 'usx-label');
    if (def.className) await expect(label).toHaveClass(...def.className.split(' '));
    await hasClass(label, 'usa-label--error', Boolean(def.error));
    await hasClass(label, 'usa-sr-only', Boolean(def.screenReaderOnly));
  }
  await expect(label).toHaveTextContent(def.children);

  const marker = label.querySelector('abbr.usx-required');
  await expect(marker !== null).toBe(Boolean(def.required));
  if (marker) await expect(marker).toHaveAttribute('title', 'Required');

  // Screen-reader-only labels stay in the accessibility tree but are moved off-screen.
  const { left, right } = label.getBoundingClientRect();
  if (def.screenReaderOnly) await expect(right).toBeLessThan(0);
  else await expect(left).toBeGreaterThanOrEqual(0);
};

const play = createAllVariantsPlay(
  Object.fromEntries(Object.entries(storyDefs).map(([key, def]) => [titleOf(key), checkLabel(def)]))
);

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
