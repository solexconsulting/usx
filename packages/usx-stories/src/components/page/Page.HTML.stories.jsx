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

  const content = page.querySelector(':scope > .usx-page__content');
  await expect(content.querySelectorAll('p').length).toBeGreaterThan(0);
  await expect(title.getBoundingClientRect().bottom).toBeLessThanOrEqual(
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
