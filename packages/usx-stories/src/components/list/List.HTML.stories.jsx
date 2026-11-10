import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/list/list.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/list/list.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './List.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/List',
  tags: ['USWDS', 'autodocs'],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

// Items are text or `{ content, children, ordered }` for a nested list inside the item.
const checkList = async (root, { items, caption, ordered, unstyled }) => {
  const list = caption ? root.lastElementChild : root;
  if (caption) {
    await expect(root.tagName).toBe('FIGURE');
    await expect(root).toHaveClass('usx-list-figure');
    await expect(root.children).toHaveLength(2);
    await expect(root.firstElementChild.tagName).toBe('FIGCAPTION');
    await expect(root.firstElementChild).toHaveClass('usx-list-figure__caption');
    await expect(root.firstElementChild).toHaveTextContent(caption);
  }
  await expect(list.tagName).toBe(ordered ? 'OL' : 'UL');
  await expect(list).toHaveClass('usa-list', 'usx-list');
  await hasClass(list, 'usa-list--unstyled', Boolean(unstyled));
  const rendered = [...list.children];
  await expect(rendered).toHaveLength(items.length);
  for (const [index, item] of items.entries()) {
    await expect(rendered[index].tagName).toBe('LI');
    if (typeof item === 'string') {
      await expect(rendered[index].textContent.trim()).toBe(item);
      await expect(rendered[index].querySelector('ul, ol')).toBeNull();
    } else {
      const nested = rendered[index].querySelector(':scope > ul, :scope > ol');
      await expect(rendered[index].firstChild.textContent.trim()).toBe(item.content);
      await checkList(nested, { items: item.children, ordered: item.ordered });
    }
  }
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [
      sectionTitle(key),
      (list) => checkList(list, def),
    ])
  )
);

export const AllVariantsReact = {
  name: 'All Variants (React)',
  tags: ['USX'],
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
  tags: ['USX'],
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
