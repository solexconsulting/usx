import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/hint/hint.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/hint/hint.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Hint.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle, snapshotId } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Hint',
  tags: ['USWDS', 'autodocs'],
};

const checkHint = (def) => async (hint) => {
  await expect(hint).toHaveClass('usa-hint', 'usx-hint');
  if (def.className) await expect(hint).toHaveClass(...def.className.split(' '));
  await expect(hint.id).toMatch(snapshotId(def.id));
  await expect(hint).toHaveTextContent(def.children);
  await expect(hint).toBeVisible();
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkHint(def)])
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
