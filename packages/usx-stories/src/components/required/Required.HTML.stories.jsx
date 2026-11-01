import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/required/required.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/required/required.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Required.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Required',
  tags: ['USX', 'autodocs'],
};

const checkRequired = (def) => async (marker) => {
  await expect(marker.tagName).toBe('ABBR');
  await expect(marker).toHaveClass('usx-required');
  await expect(marker).toHaveTextContent('*');
  await expect(marker).toHaveAttribute('title', def.title ?? 'Required');
  // The text that follows is the field's own wording, outside the marker.
  await expect(marker.nextSibling.textContent.trim()).toBe(def.children);
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkRequired(def)])
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
