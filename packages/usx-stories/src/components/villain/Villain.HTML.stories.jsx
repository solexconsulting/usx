import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/villain/villain.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/villain/villain.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import * as stories from './Villain.React.stories.jsx';
import { storyDefs } from './Villain.React.stories.jsx';
import { createAllVariantsPlay, titleFor } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Villain',
  tags: ['USWDS', 'autodocs'],
};

const checkHero = (def) => async (hero) => {
  await expect(hero.tagName).toBe('SECTION');
  await expect(hero).toHaveClass('usa-hero');
  await expect(hero).toHaveAccessibleName('Introduction');

  const heading = hero.querySelector('h1.usa-hero__heading');
  const callout = heading.querySelector('.usa-hero__heading--alt');
  await expect(heading).toHaveTextContent(def.title);
  if (def.callout) {
    await expect(callout).toHaveTextContent(def.callout);
    // The callout leads the heading, as a smaller line above the title.
    await expect(heading.firstElementChild).toBe(callout);
  } else {
    await expect(callout).toBeNull();
  }
  await expect(hero.querySelector('p')).toHaveTextContent(def.paragraph);

  const action = hero.querySelector('a.usa-button');
  if (def.button) {
    await expect(action).toHaveAttribute('href', def.button.href);
    await expect(action).toHaveTextContent(def.button.text);
  } else {
    await expect(action).toBeNull();
  }
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [titleFor(stories, key), checkHero(def)])
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
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
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
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play,
};
