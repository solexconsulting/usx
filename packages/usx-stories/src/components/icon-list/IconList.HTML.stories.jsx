import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/icon-list/icon-list.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/icon-list/icon-list.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './IconList.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/IconList',
  tags: ['USWDS', 'autodocs'],
};

const textOf = (html) =>
  new DOMParser().parseFromString(html, 'text/html').body.textContent.replace(/\s+/g, ' ').trim();

const checkList = (def) => async (root) => {
  const list = def.caption ? root.lastElementChild : root;
  if (def.caption) {
    await expect(root.tagName).toBe('FIGURE');
    await expect(root).toHaveClass('usx-list-figure');
    await expect(root.children).toHaveLength(2);
    await expect(root.firstElementChild.tagName).toBe('FIGCAPTION');
    await expect(root.firstElementChild).toHaveClass('usx-list-figure__caption');
    await expect(root.firstElementChild).toHaveTextContent(def.caption);
  }
  await expect(list.tagName).toBe('UL');
  await expect(list).toHaveClass('usa-icon-list', 'usx-icon-list');
  await (def.primary ? expect(list) : expect(list).not).toHaveClass('usa-icon-list--primary');
  if (def.size) await expect(list).toHaveClass(`usa-icon-list--size-${def.size}`);
  else await expect([...list.classList].some((name) => name.includes('--size-'))).toBe(false);

  const items = [...list.children];
  await expect(items).toHaveLength(def.items.length);
  for (const [index, item] of def.items.entries()) {
    const li = items[index];
    await expect(li).toHaveClass('usa-icon-list__item');
    const icon = li.querySelector('.usa-icon-list__icon');
    await expect(icon.querySelector('use').getAttribute('href')).toMatch(
      new RegExp(`#${item.iconName}$`)
    );
    if (item.iconColor) {
      await expect(icon).toHaveClass(`text-${item.iconColor}`);
      await expect(icon.querySelector('svg')).toHaveClass(`text-${item.iconColor}`);
    }
    // The icon sits before the text.
    await expect(icon.getBoundingClientRect().right).toBeLessThanOrEqual(
      li.querySelector('.usa-icon-list__content').getBoundingClientRect().left + 1
    );

    const title = li.querySelector('.usa-icon-list__title');
    if (item.title) await expect(title).toHaveTextContent(item.title);
    else await expect(title).toBeNull();
    await expect(
      li.querySelector('.usa-icon-list__content').textContent.replace(/\s+/g, ' ')
    ).toContain(textOf(item.content));
  }
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkList(def)])
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
