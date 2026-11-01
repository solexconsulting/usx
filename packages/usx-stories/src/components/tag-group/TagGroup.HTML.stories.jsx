import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/tag-group/tag-group.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/tag-group/tag-group.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './TagGroup.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS-Inspired/TagGroup',
  tags: ['USWDS-Inspired', 'autodocs'],
};

const checkGroup = (def) => async (group) => {
  await expect(group).toHaveClass('usx-tag-group');
  const tags = [...group.children];
  await expect(tags.map((tag) => tag.textContent.trim())).toEqual(
    def.tagProps.map((tag) => tag.value)
  );
  for (const [index, tag] of def.tagProps.entries()) {
    await expect(tags[index]).toHaveClass('usa-tag', 'usx-tag', `bg-${tag.color}`);
    await (tag.big ? expect(tags[index]) : expect(tags[index]).not).toHaveClass('usa-tag--big');
  }
  // Tags sit on one line with space between them.
  for (let i = 1; i < tags.length; i++) {
    const [previous, next] = [tags[i - 1], tags[i]].map((tag) => tag.getBoundingClientRect());
    await expect(next.left).toBeGreaterThan(previous.right);
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
