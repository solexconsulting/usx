import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/page/page.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/page/page.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Page.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Page',
  tags: ['USX', 'autodocs'],
};

const checkPage = (def) => async (page) => {
  await expect(page.tagName).toBe('MAIN');
  await expect(page).toHaveClass('usx-page');
  if (def.className) await expect(page).toHaveClass(...def.className.split(' '));

  // One h1 names the page; an eyebrow sits in it ahead of the title text.
  const headings = page.querySelectorAll(':scope > h1.usx-page__title');
  await expect(headings).toHaveLength(1);
  const title = headings[0];
  const eyebrow = title.querySelector('.usx-eyebrow');
  if (def.eyebrow) {
    await expect(eyebrow).toHaveTextContent(def.eyebrow);
    await expect(title.firstElementChild).toBe(eyebrow);
  } else {
    await expect(eyebrow).toBeNull();
  }
  await expect(title.textContent).toContain(def.title ?? 'Page title');

  const summary = page.querySelector(':scope > .usx-page__summary');
  const hasSummary = Boolean(def.subtitle || def.description || def.tagProps?.length);
  if (hasSummary) {
    await expect(summary).not.toBeNull();
    for (const field of ['subtitle', 'description']) {
      const item = summary.querySelector(`.usx-page__${field}`);
      if (def[field]) await expect(item).toHaveTextContent(def[field]);
      else await expect(item).toBeNull();
    }
    const tags = summary.querySelectorAll('.usx-page__tags .usx-tag');
    await expect(tags).toHaveLength(def.tagProps?.length || 0);
    def.tagProps?.forEach((tag, index) => expect(tags[index]).toHaveTextContent(tag.value));
    const actualOrder = [...summary.children].map((item) =>
      item.classList.contains('usx-page__tags') ? 'tags' : item.className.replace('usx-page__', '')
    );
    const expectedOrder = [
      def.subtitle && 'subtitle',
      def.tagProps?.length && 'tags',
      def.description && 'description',
    ].filter(Boolean);
    await expect(actualOrder).toEqual(expectedOrder);
    await expect(title.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      summary.getBoundingClientRect().top + 1
    );
  } else {
    await expect(summary).toBeNull();
  }

  const content = page.querySelector(':scope > .usx-page__content');
  await expect(content.querySelectorAll('p').length).toBeGreaterThan(0);
  await expect((summary || title).getBoundingClientRect().bottom).toBeLessThanOrEqual(
    content.getBoundingClientRect().top + 1
  );
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkPage(def)])
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
