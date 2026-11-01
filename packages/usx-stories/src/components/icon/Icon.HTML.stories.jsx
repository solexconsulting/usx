import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/icon/icon.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/icon/icon.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { createAllVariantsPlay } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Icon',
  tags: ['USWDS', 'autodocs'],
};

const spriteName = (svg) => svg.querySelector('use').getAttribute('href').split('#')[1];
const sizeOf = (svg) => Number(svg.getAttribute('class').match(/icon--size-(\d+)/)[1]);
const row = (section) => [...section.querySelectorAll(':scope > svg')];

const checkIcon = async (svg, { name, sprite, size }) => {
  await expect(svg).toHaveClass('usa-icon');
  await expect(svg).toHaveAttribute('aria-hidden', 'true');
  await expect(svg).toHaveAttribute('focusable', 'false');
  await expect(spriteName(svg)).toBe(name);
  await expect(svg.querySelector('use').getAttribute('href')).toContain(sprite);
  await expect(sizeOf(svg)).toBe(size);
  // Each full size is 8px per step; the half-step size 1 is smaller than size 2 but not 8px.
  if (size > 1) await expect(svg.getBoundingClientRect().width).toBe(size * 8);
  else await expect(svg.getBoundingClientRect().width).toBeLessThan(16);
};

const play = createAllVariantsPlay({
  Default: (svg) => checkIcon(svg, { name: 'accessibility_new', sprite: '/sprite.svg', size: 2 }),
  'USX Source': (svg) => checkIcon(svg, { name: 'spinner', sprite: '/usx-sprite.svg', size: 3 }),
  'Different Sizes': async (section) => {
    const icons = row(section);
    await expect(icons.length).toBeGreaterThan(1);
    const sizes = icons.map(sizeOf);
    await expect(sizes).toEqual([...sizes].sort((a, b) => a - b));
    const widths = icons.map((svg) => svg.getBoundingClientRect().width);
    for (let i = 1; i < widths.length; i++) await expect(widths[i]).toBeGreaterThan(widths[i - 1]);
    for (const svg of icons)
      await checkIcon(svg, { name: 'accessibility_new', sprite: '/sprite.svg', size: sizeOf(svg) });
  },
  'Different Icons': async (section) => {
    const icons = row(section);
    await expect(new Set(icons.map(spriteName)).size).toBe(icons.length);
    for (const svg of icons)
      await checkIcon(svg, { name: spriteName(svg), sprite: '/sprite.svg', size: 3 });
  },
  'Different Colors': async (section) => {
    const icons = row(section);
    // Every colour class gives a different colour.
    await expect(new Set(icons.map((svg) => getComputedStyle(svg).color)).size).toBe(icons.length);
    for (const svg of icons) await expect(svg.getAttribute('class')).toMatch(/\btext-[a-z-]+\b/);
  },
});

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
