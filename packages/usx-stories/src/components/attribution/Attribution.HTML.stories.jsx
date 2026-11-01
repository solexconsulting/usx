import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/attribution/attribution.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/attribution/attribution.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Attribution.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Attribution',
  tags: ['USX', 'autodocs'],
};

const checkAttribution = (def) => async (attribution) => {
  await expect(attribution).toHaveClass('usx-attribution');
  await expect(attribution.querySelector('.usx-attribution__primary')).toHaveTextContent(
    def.primary
  );
  await expect(attribution.querySelector('.usx-attribution__secondary')).toHaveTextContent(
    def.secondary
  );

  // The avatar sits in its own media slot before the text, and only when avatarProps is given.
  const media = attribution.querySelector('.usx-attribution__media');
  const content = attribution.querySelector('.usx-attribution__content');
  if (!def.avatarProps) return expect(media).toBeNull();
  await expect(media.querySelector('a.usx-avatar')).toHaveAttribute('href', def.avatarProps.href);
  await expect(media.querySelector('a.usx-avatar')).toHaveAccessibleName(def.avatarProps.alt);
  await expect(media.getBoundingClientRect().right).toBeLessThanOrEqual(
    content.getBoundingClientRect().left + 1
  );
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkAttribution(def)])
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
