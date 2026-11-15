import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/tag/tag.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/tag/tag.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import * as tagStories from './Tag.React.stories.jsx';
import { storyDefs } from './Tag.React.stories.jsx';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Tag',
  tags: ['USWDS', 'autodocs'],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

const checkTag = (def) => async (tag) => {
  const interactive = Boolean(def.href);
  await expect(tag).toHaveClass('usa-tag', 'usx-tag');
  await hasClass(tag, 'usa-tag--big', Boolean(def.big));
  await hasClass(tag, 'usx-tag--outline', Boolean(def.outline || interactive));
  await expect(tag.tagName).toBe(def.href ? 'A' : 'SPAN');
  await hasClass(tag, 'usx-tag--interactive', interactive);
  if (interactive) {
    await expect(tag).toHaveClass('usa-link', 'usx-link');
    await expect(tag).not.toHaveClass('text-secondary');
    await expect(tag).not.toHaveClass('bg-secondary');
    await expect(getComputedStyle(tag).textTransform).toBe('none');
    await expect(tag).toHaveAttribute('href', def.href);
  }
  // Solid tags fill with the colour; outline tags colour their text instead.
  if (def.color && !interactive)
    await expect(tag).toHaveClass(def.outline ? `text-${def.color}` : `bg-${def.color}`);

  const icon = tag.querySelector(':scope > svg');
  if (def.icon) {
    await expect(icon.querySelector('use')).toHaveAttribute(
      'href',
      expect.stringMatching(new RegExp(`#${def.icon}$`))
    );
    // The icon leads the text.
    await expect(tag.firstElementChild).toBe(icon);
  } else {
    await expect(icon).toBeNull();
  }

  const dismiss = tag.querySelector('button.usx-tag__dismiss');
  if (def.dismissible) {
    await expect(dismiss).toHaveAccessibleName('Dismiss tag');
    await expect(dismiss).toHaveAttribute('type', 'button');
  } else {
    await expect(dismiss).toBeNull();
  }

  const text = tag.cloneNode(true);
  text.querySelectorAll('svg, button').forEach((node) => node.remove());
  await expect(text.textContent.trim()).toBe(def.children);
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [
    tagStories[key]?.name ?? sectionTitle(key),
    checkTag(def),
  ])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Link styled as a tag', async () => {
    const link = sectionFor(context.canvasElement, 'Link styled as a tag');
    await expect(link.tagName).toBe('A');
    await expect(link).toHaveClass('usa-link', 'usx-link', 'usa-tag', 'usx-tag');
    await expect(link).toHaveAttribute('href', '#related-topics');
    await expect(getComputedStyle(link).textTransform).toBe('none');
  });
  await context.step('Big is bigger', async () => {
    const height = (title) =>
      sectionFor(context.canvasElement, title).getBoundingClientRect().height;
    await expect(height('Big tag')).toBeGreaterThan(height('Default'));
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
