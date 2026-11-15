import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/link/link.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/link/link.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import * as linkStories from './Link.React.stories.jsx';
import { storyDefs } from './Link.React.stories.jsx';
import {
  contrastRatio,
  createAllVariantsPlay,
  sectionFor,
  sectionTitle,
} from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Link',
  tags: ['USWDS', 'autodocs'],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

const checkLink = (key, def) => async (section) => {
  const onDark = section.matches('.usa-dark-background');
  const link = onDark ? section.querySelector('a') : section;
  await expect(link.tagName).toBe('A');
  await expect(link).toHaveClass('usa-link', 'usx-link');
  await expect(link).toHaveAttribute('href', def.href);
  await expect(link).toHaveTextContent(def.children);
  await hasClass(link, 'usx-link--visited', Boolean(def.visited));
  await hasClass(link, 'usa-link--external', Boolean(def.external));
  await hasClass(link, 'usa-link--alt', Boolean(def.alt));

  // Opening in a new tab always comes with rel=noreferrer noopener.
  if (def.newTab) {
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  }

  // On a dark surface the link must stay readable.
  if (onDark) {
    await expect(section).toHaveClass('usa-dark-background');
    await expect(
      contrastRatio(getComputedStyle(link).color, getComputedStyle(section).backgroundColor)
    ).toBeGreaterThanOrEqual(4.5);
  }
};

const play = async (context) => {
  await createAllVariantsPlay(
    Object.fromEntries(
      Object.entries(storyDefs).map(([key, def]) => [
        linkStories[key]?.name ?? sectionTitle(key),
        checkLink(key, def),
      ])
    )
  )(context);
  await context.step('Tag used as a link', async () => {
    const tag = sectionFor(context.canvasElement, 'Tag used as a link');
    await expect(tag.tagName).toBe('A');
    await expect(tag).toHaveClass('usa-tag', 'usx-tag', 'usa-link', 'usx-link');
    await expect(tag).toHaveAttribute('href', '#related-topics');
    await expect(getComputedStyle(tag).textTransform).toBe('none');
  });
};

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
