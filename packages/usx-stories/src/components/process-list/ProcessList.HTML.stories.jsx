import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/process-list/process-list.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/process-list/process-list.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './ProcessList.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/ProcessList',
  tags: ['USWDS', 'autodocs'],
};

const checkList = (def) => async (list) => {
  await expect(list.tagName).toBe('OL');
  await expect(list).toHaveClass('usa-process-list', 'usx-process-list');
  const items = [...list.children];
  await expect(items).toHaveLength(def.items.length);

  for (const [index, item] of def.items.entries()) {
    await expect(items[index]).toHaveClass('usa-process-list__item');
    if (item.className) await expect(items[index]).toHaveClass(...item.className.split(' '));

    const heading = items[index].querySelector(':scope > .usa-process-list__heading');
    await expect(heading.tagName).toBe((item.headingAs ?? 'h4').toUpperCase());
    await expect(heading).toHaveTextContent(item.heading);
    if (item.headingClassName)
      await expect(heading).toHaveClass(...item.headingClassName.split(' '));
    // The heading leads the item; its body follows.
    await expect(items[index].firstElementChild).toBe(heading);
    await expect(items[index].children.length > 1).toBe(Boolean(item.body));
  }

  // Steps run down the page in order.
  const tops = items.map((item) => item.getBoundingClientRect().top);
  await expect(tops).toEqual([...tops].sort((a, b) => a - b));
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkList(def)])
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
