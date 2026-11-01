import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/prose/prose.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/prose/prose.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import * as stories from './Prose.React.stories.jsx';
import { storyDefs } from './Prose.React.stories.jsx';
import { createAllVariantsPlay, titleFor } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Prose',
  tags: ['USWDS', 'autodocs'],
};

const parse = (html) => new DOMParser().parseFromString(html, 'text/html').body;
const squash = (text) => text.replace(/\s+/g, ' ').trim();

const checkProse = (def) => async (prose) => {
  await expect(prose.tagName).toBe(def.as.toUpperCase());
  await expect(prose).toHaveClass('usa-prose', 'usx-prose');

  // The supplied markup is rendered as is: same text and the same headings, lists and links.
  const expected = parse(def.content);
  await expect(squash(prose.textContent)).toBe(squash(expected.textContent));
  for (const selector of ['h1, h2, h3, h4, h5, h6', 'ul, ol', 'li', 'a', 'p']) {
    await expect(prose.querySelectorAll(selector)).toHaveLength(
      expected.querySelectorAll(selector).length
    );
  }
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [titleFor(stories, key), checkProse(def)])
  )
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
