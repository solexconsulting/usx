import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/sidenav/sidenav.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/sidenav/sidenav.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './SideNav.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/SideNav',
  tags: ['USWDS', 'autodocs'],
};

const checkItems = async (list, items, depth) => {
  await expect(list).toHaveClass(depth === 0 ? 'usa-sidenav' : 'usa-sidenav__sublist');
  const rendered = [...list.children];
  await expect(rendered).toHaveLength(items.length);
  for (const [index, item] of items.entries()) {
    await expect(rendered[index]).toHaveClass('usa-sidenav__item');
    const link = rendered[index].querySelector(':scope > a');
    await expect(link).toHaveAttribute('href', item.href);
    await expect(link).toHaveTextContent(item.text);
    await (item.current ? expect(link) : expect(link).not).toHaveClass('usa-current');
    if (item.current) await expect(link).toHaveAttribute('aria-current', 'page');
    else await expect(link).not.toHaveAttribute('aria-current');

    const sublist = rendered[index].querySelector(':scope > ul');
    if (item.children) {
      // Each level is indented further than its parent, with the link's own padding.
      const indent = (anchor) => parseFloat(getComputedStyle(anchor).paddingLeft);
      await expect(indent(sublist.querySelector('a'))).toBeGreaterThan(indent(link));
      await checkItems(sublist, item.children, depth + 1);
    } else {
      await expect(sublist).toBeNull();
    }
  }
};

const checkNav = (def) => async (nav) => {
  await expect(nav.tagName).toBe('NAV');
  await expect(nav).toHaveAccessibleName('Side navigation');
  const list = nav.querySelector(':scope > ul.usx-sidenav');
  await checkItems(list, def.items, 0);
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkNav(def)])
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
