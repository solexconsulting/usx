import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/container/container.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/container/container.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Container.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/Container',
  tags: ['USX', 'autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="padding-2 tablet:padding-3">
        <Story />
      </div>
    ),
  ],
};

const TABLET = 640;
const DESKTOP = 1024;
const style = (element) => getComputedStyle(element);
const px = (element, property) => parseFloat(style(element)[property]);
const kids = (element) => [...element.children];

// Layouts respond to the viewport the story is shown in, so the expectation is derived from it.
const viewport = () => ({
  tablet: window.innerWidth >= TABLET,
  desktop: window.innerWidth >= DESKTOP,
});
const pick = ({ base, tablet = base, desktop = tablet }) => {
  const { tablet: isTablet, desktop: isDesktop } = viewport();
  return isDesktop ? desktop : isTablet ? tablet : base;
};

// Applies to every section: the root is a container, landmarks are named, ids are unique, nothing overflows.
const checkGeneric = (def) => async (root) => {
  await expect(root).toHaveClass('usx-container');
  if (def.className) await expect(root).toHaveClass(...def.className.split(' '));
  if (def.as) await expect(root.tagName).toBe(def.as.toUpperCase());
  if (def.gridContainer) await expect(root).toHaveClass('grid-container');
  for (const landmark of root.querySelectorAll('section[aria-label], article[aria-label]')) {
    await expect(landmark).toHaveAccessibleName();
  }
  const ids = [...root.querySelectorAll('[id]')].map((element) => element.id);
  await expect(new Set(ids).size).toBe(ids.length);
  await expect(root.scrollWidth).toBeLessThanOrEqual(root.clientWidth + 1);
};

const specific = {
  ResponsiveStack: async (root) => {
    const items = kids(root);
    await expect(style(root).display).toBe('flex');
    await expect(style(root).flexDirection).toBe(pick({ base: 'column', tablet: 'row' }));
    await expect(style(root).flexWrap).toBe(pick({ base: 'nowrap', tablet: 'wrap' }));
    await expect(px(root, 'columnGap')).toBe(pick({ base: 16, tablet: 24 }));
    const sameRow = items[0].getBoundingClientRect().top === items[1].getBoundingClientRect().top;
    await expect(sameRow).toBe(viewport().tablet);
  },
  ResponsiveGrid: async (root) => {
    const row = root.querySelector('.grid-row');
    const columns = kids(row);
    await expect(columns).toHaveLength(3);
    const share = pick({ base: 12, tablet: 6, desktop: 4 }) / 12;
    for (const column of columns) {
      await expect(column.getBoundingClientRect().width).toBeCloseTo(
        row.getBoundingClientRect().width * share,
        -0.5
      );
    }
  },
  AsymmetricGrid: async (root) => {
    const [main, aside] = kids(root.querySelector('.grid-row'));
    await expect(aside.tagName).toBe('ASIDE');
    const rowWidth = main.parentElement.getBoundingClientRect().width;
    await expect(main.getBoundingClientRect().width).toBeCloseTo(
      (rowWidth * pick({ base: 12, tablet: 8 })) / 12,
      -0.5
    );
    await expect(aside.getBoundingClientRect().width).toBeCloseTo(
      (rowWidth * pick({ base: 12, tablet: 8, desktop: 4 })) / 12,
      -0.5
    );
    // Side by side on desktop, stacked below.
    const beside = aside.getBoundingClientRect().left >= main.getBoundingClientRect().right - 1;
    await expect(beside).toBe(viewport().desktop);
  },
  FlexibleItems: async (root) => {
    await expect(style(root).display).toBe('flex');
    await expect(style(root).flexDirection).toBe(pick({ base: 'column', tablet: 'row' }));
  },
  SemanticList: async (root) => {
    await expect(root.tagName).toBe('UL');
    await expect(kids(root).map((item) => item.tagName)).toEqual(['LI', 'LI', 'LI']);
    for (const item of kids(root)) await expect(item).toHaveClass('usx-container');
    await expect(style(root).flexDirection).toBe(pick({ base: 'column', tablet: 'row' }));
    await expect(style(root).listStyleType).toBe('none');
  },
  ResponsiveVisibility: async (root) => {
    const extra = kids(root).find((element) => element.classList.contains('usx-container'));
    await expect(style(extra).display).toBe(pick({ base: 'none', tablet: 'block' }));
  },
  FloatContainment: async (root) => {
    const floated = root.querySelector('.usx-container--float-none');
    await expect(style(floated).float).toBe(pick({ base: 'none', tablet: 'right' }));
    // flow-root keeps the floated box inside the container.
    await expect(root.getBoundingClientRect().bottom).toBeGreaterThanOrEqual(
      floated.getBoundingClientRect().bottom - 1
    );
  },
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [
    sectionTitle(key),
    async (root, context) => {
      await checkGeneric(def)(root);
      await specific[key]?.(root, context);
    },
  ])
);

const play = createAllVariantsPlay(checks);

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play,
};
