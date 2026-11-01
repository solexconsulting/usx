import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/clickable/clickable.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/clickable/clickable.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Clickable.React.stories.jsx';
import { createAllVariantsPlay } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Clickable',
  tags: ['USX', 'autodocs'],
};

// Story export key to section title, where the story sets its own name.
const titles = {
  MultipleClickableCard: 'Multiple Clickables',
  ReadJohnsStoryCta: "Read John's Story CTA",
  ClickableQuoteV2: 'Clickable Quote v2 (Manual Markup)',
};
const titleOf = (key) => titles[key] ?? key.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

const checkClickable = (def) => async (section) => {
  const surfaces = section.matches('a, button')
    ? [section]
    : [...section.querySelectorAll(':scope a.usx-clickable')];
  await expect(surfaces.length).toBeGreaterThan(0);

  for (const surface of surfaces) {
    await expect(surface).toHaveClass('usx-clickable', ...def.className.split(' '));
    if (def.href) {
      await expect(surface.tagName).toBe('A');
      await expect(surface).toHaveAttribute('href', def.href);
    } else {
      await expect(surface.tagName).toBe('BUTTON');
      await expect(surface).toHaveAttribute('type', 'button');
    }
    await expect(surface).toHaveAccessibleName();
    // The whole surface is the one interactive element; nothing clickable nests inside it.
    await expect(surface.querySelectorAll('a, button')).toHaveLength(0);

    // Only the marked text reads as a link; colour-on-hover parts are nested in it or beside it by story.
    const link = surface.querySelector('.usx-clickable__link');
    await expect(link).toBeTruthy();
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [titleOf(key), checkClickable(def)])
);
// Whether the hover-colour parts sit inside the link text is what tells the three colour stories apart.
const nesting = { ColorClassesWithinLinkClass: true, ColorClassesOutsideLinkClass: false };
for (const [key, inside] of Object.entries(nesting)) {
  const check = checks[titleOf(key)];
  checks[titleOf(key)] = async (section) => {
    await check(section);
    const link = section.querySelector('.usx-clickable__link');
    for (const part of section.querySelectorAll('[class*="-on-hover"]')) {
      await expect(link.contains(part)).toBe(inside);
    }
  };
}

const play = createAllVariantsPlay(checks);

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
