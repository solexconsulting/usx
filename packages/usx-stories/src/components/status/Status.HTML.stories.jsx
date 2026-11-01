import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/status/status.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/status/status.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Status.React.stories.jsx';
import { createAllVariantsPlay, sectionFor } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Status',
  tags: ['USX', 'autodocs'],
};

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];
const titleOf = (key) =>
  key
    .replace(/^Size(\w+)$/, (_, size) => `Size: ${size.toLowerCase()}`)
    .replace(/([a-z])([A-Z])/g, '$1 $2');
const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

const checkStatus = (def) => async (status) => {
  await expect(status.tagName).toBe('SPAN');
  await expect(status).toHaveClass('usx-status');
  await hasClass(status, `text-${def.color}`, Boolean(def.color));
  await hasClass(status, `usx-status--${def.size}`, Boolean(def.size));
  await hasClass(status, `usx-${def.animation}`, Boolean(def.animation));
  // A status dot is decorative: it carries no text.
  await expect(status).toBeEmptyDOMElement();
  await expect(status.getBoundingClientRect().width).toBeGreaterThan(0);
  if (def.animation) {
    // The motion is drawn on the dot itself or on one of its pseudo-elements.
    const animated = [undefined, '::before', '::after'].some(
      (pseudo) => getComputedStyle(status, pseudo).animationName !== 'none'
    );
    await expect(animated).toBe(true);
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [titleOf(key), checkStatus(def)])
);
// The overviews repeat the individual dots in a row.
const row = (section) => [...section.children];
checks['All Colors'] = async (section) => {
  const dots = row(section);
  await expect(dots).toHaveLength(8);
  await expect(new Set(dots.map((dot) => getComputedStyle(dot).color)).size).toBe(8);
};
checks['All Sizes'] = async (section) => {
  const widths = row(section).map((dot) => dot.getBoundingClientRect().width);
  await expect(widths).toHaveLength(SIZES.length);
  for (let i = 1; i < widths.length; i++) await expect(widths[i]).toBeGreaterThan(widths[i - 1]);
};
checks['All Animations'] = async (section) => {
  const dots = row(section);
  await expect(
    dots.map((dot) => [...dot.classList].find((name) => /^usx-(ping|pulse|bounce)$/.test(name)))
  ).toEqual(['usx-ping', 'usx-pulse', 'usx-bounce']);
};

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Sizes grow', async () => {
    const width = (size) =>
      sectionFor(context.canvasElement, `Size: ${size}`).getBoundingClientRect().width;
    const widths = SIZES.map(width);
    for (let i = 1; i < widths.length; i++) await expect(widths[i]).toBeGreaterThan(widths[i - 1]);
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
