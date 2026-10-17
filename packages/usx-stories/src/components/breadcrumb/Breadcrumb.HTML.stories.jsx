import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/breadcrumb/breadcrumb.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/breadcrumb/breadcrumb.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Breadcrumb.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Breadcrumb',
  tags: ['USWDS', 'autodocs'],
};

const checkBreadcrumb = (def) => async (nav) => {
  if (!def.items.length) {
    await expect(nav).toHaveClass('usx-breadcrumb');
    await expect(nav.children).toHaveLength(0);
    return;
  }
  await expect(nav.tagName).toBe('NAV');
  await expect(nav).toHaveAccessibleName('Breadcrumbs');
  await expect(nav).toHaveClass('usa-breadcrumb', 'usx-breadcrumb');
  if (def.className) await expect(nav).toHaveClass(def.className);
  await (def.wrap ? expect(nav) : expect(nav).not).toHaveClass('usa-breadcrumb--wrap');

  const list = nav.querySelector('ol.usa-breadcrumb__list');
  const items = [...list.children];
  await expect(items).toHaveLength(def.items.length);
  for (const [index, item] of def.items.entries()) {
    const li = items[index];
    if (item.current) {
      await expect(li).toHaveAttribute('aria-current', 'page');
      await expect(li).toHaveClass('usa-current');
      await expect(li.querySelector('a')).toBeNull();
      await expect(li).toHaveTextContent(item.label);
    } else {
      await expect(li).not.toHaveAttribute('aria-current');
      await expect(li.querySelector('a.usa-breadcrumb__link')).toHaveAttribute('href', item.href);
      await expect(li.querySelector('a')).toHaveTextContent(item.label);
    }
  }

  // RDFa markup describes the trail to crawlers with a 1-based position on every item.
  if (def.rdfa) {
    await expect(list).toHaveAttribute('typeof', 'BreadcrumbList');
    for (const [index, li] of items.entries()) {
      await expect(li).toHaveAttribute('property', 'itemListElement');
      await expect(li.querySelector('meta[property="position"]')).toHaveAttribute(
        'content',
        String(index + 1)
      );
    }
  } else {
    await expect(list).not.toHaveAttribute('typeof');
    await expect(nav.querySelector('meta')).toBeNull();
  }
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkBreadcrumb(def)])
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
