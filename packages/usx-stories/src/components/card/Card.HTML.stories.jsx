import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/card/card.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/card/card.django-snapshot.html?raw';
import { componentInit } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Card.React.stories.jsx';
import { checkCard } from './checkCard.js';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Card',
  tags: ['USWDS', 'autodocs'],
  decorators: [...componentInit('carousel')],
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [
      sectionTitle(key),
      (card) => checkCard(card, def),
    ])
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
