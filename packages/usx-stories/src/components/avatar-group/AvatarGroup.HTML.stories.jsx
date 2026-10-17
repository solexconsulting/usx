import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/avatar-group/avatar-group.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/avatar-group/avatar-group.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './AvatarGroup.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/AvatarGroup',
  tags: ['USX', 'autodocs'],
};

const checkGroup = (def) => async (group) => {
  await expect(group).toHaveClass('usx-avatar-group');
  await (def.overlap ? expect(group) : expect(group).not).toHaveClass('usa-avatar-group--overlap');
  await (def.stacked ? expect(group) : expect(group).not).toHaveClass('usa-avatar-group--stacked');

  const links = [...group.querySelectorAll('a.usx-avatar')];
  await expect(links).toHaveLength(def.avatarProps.length);
  for (const [index, avatar] of def.avatarProps.entries()) {
    const img = links[index].querySelector('img');
    await expect(links[index]).toHaveAttribute('href', avatar.href);
    await expect(img).toHaveAttribute('src', avatar.src);
    await expect(links[index]).toHaveAccessibleName(avatar.alt);
    if (avatar.shape) await expect(img).toHaveClass(`usx-${avatar.shape}`);
    const tooltip = links[index].parentElement.querySelector('[role="tooltip"]');
    if (avatar.tooltip) await expect(tooltip).toHaveTextContent(avatar.tooltip);
    else await expect(tooltip).toBeNull();
  }

  // Overlap pulls neighbours over each other; otherwise they sit side by side. Stacked changes only the layering.
  if (!def.stacked) {
    for (let i = 1; i < links.length; i++) {
      const gap =
        links[i].getBoundingClientRect().left - links[i - 1].getBoundingClientRect().right;
      if (def.overlap) await expect(gap).toBeLessThan(0);
      else await expect(gap).toBeGreaterThanOrEqual(0);
    }
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
