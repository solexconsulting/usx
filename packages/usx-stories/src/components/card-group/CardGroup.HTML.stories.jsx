import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/card-group/card-group.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/card-group/card-group.django-snapshot.html?raw';
import { componentInit } from '../../utils/storyHelpers.jsx';
import { expect } from 'storybook/test';
import { storyDefs } from './CardGroup.React.stories.jsx';
import { checkCard } from '../card/checkCard.js';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/CardGroup',
  tags: ['USWDS', 'autodocs'],
  decorators: [...componentInit('carousel')],
};

const checkGroup = (def) => async (group) => {
  await expect(group.tagName).toBe('UL');
  await expect(group).toHaveClass('usa-card-group', 'usx-card-group');
  const cards = [...group.children];
  await expect(cards).toHaveLength(def.cardProps.length);
  for (const [index, cardDef] of def.cardProps.entries()) {
    await expect(cards[index].tagName).toBe('LI');
    await checkCard(cards[index], cardDef);
  }
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkGroup(def)])
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
