import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/section/section.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/section/section.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import * as stories from './Section.React.stories.jsx';
import { storyDefs } from './Section.React.stories.jsx';
import { createAllVariantsPlay, titleFor } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Section',
  tags: ['USX', 'autodocs'],
};

const checkSection = (def) => async (section) => {
  await expect(section.tagName).toBe('SECTION');
  await expect(section).toHaveClass('usx-section');
  if (def.className) await expect(section).toHaveClass(...def.className.split(' '));

  const title = section.querySelector(':scope > .usx-section__title');
  if (def.title) {
    await expect(title.tagName).toBe((def.headingAs ?? 'h2').toUpperCase());
    await expect(title).toHaveTextContent(def.title);
    // The title leads the section.
    await expect(section.firstElementChild).toBe(title);
  } else {
    await expect(title).toBeNull();
  }
  const content = section.querySelector(':scope > .usx-section__content');
  await expect(content).toBeTruthy();
  await expect(content.textContent.trim().length).toBeGreaterThan(0);
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [titleFor(stories, key), checkSection(def)])
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
