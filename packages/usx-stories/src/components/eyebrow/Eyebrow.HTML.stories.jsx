import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/eyebrow/eyebrow.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/eyebrow/eyebrow.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Eyebrow.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Eyebrow',
  tags: ['USX', 'autodocs'],
};

const levels = { InH1: 'H1', InH2: 'H2', InH3: 'H3' };

const checkEyebrow = (key, def) => async (heading) => {
  const eyebrow = heading.querySelector('.usx-eyebrow');
  await expect(heading.tagName).toBe(levels[key]);
  await expect(eyebrow).toHaveTextContent(def.children);
  await expect(heading.firstElementChild).toBe(eyebrow);

  // The eyebrow reads as a small label above the heading text, which keeps the heading's own size.
  const heading_ = getComputedStyle(heading);
  const label = getComputedStyle(eyebrow);
  await expect(label.display).toBe('block');
  await expect(parseFloat(label.fontSize)).toBeLessThan(parseFloat(heading_.fontSize));
  await expect(eyebrow.getBoundingClientRect().bottom).toBeLessThanOrEqual(
    heading.getBoundingClientRect().bottom
  );
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkEyebrow(key, def)])
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
