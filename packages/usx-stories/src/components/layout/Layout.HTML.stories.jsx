import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import reactSnapshot from '../../../../usx-react/src/components/layout/layout.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/layout/layout.django-snapshot.html?raw';

export default {
  title: 'HTML/USX/Layout',
  tags: ['USX', 'autodocs'],
  parameters: { layout: 'fullscreen' },
};

// Elements between a variant's h3 heading and the next heading.
const sectionElements = (canvasElement, title) => {
  const heading = [...canvasElement.querySelectorAll('h3.site-preview-heading')].find(
    (element) => element.textContent === title
  );
  const elements = [];
  for (let next = heading.nextElementSibling; next && next.tagName !== 'H3'; ) {
    elements.push(next);
    next = next.nextElementSibling;
  }
  return elements;
};

const testExpandable = async ({ canvasElement }) => {
  const layout = sectionElements(canvasElement, 'Expandable')[0];
  const button = layout.querySelector('.usx-layout__expand-button');

  await expect(layout).not.toHaveClass('usx-expanded');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  if (getComputedStyle(button).display === 'none') return;

  await userEvent.click(button);

  await expect(layout).toHaveClass('usx-expanded');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(within(layout).getByRole('button', { name: /contract/i })).toBe(button);

  await userEvent.click(button);

  await expect(layout).not.toHaveClass('usx-expanded');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
};

const testVerticalSpacing = async ({ canvasElement }) => {
  const examples = sectionElements(canvasElement, 'Vertical Spacing').flatMap((element) => [
    ...element.querySelectorAll('[data-spacing-case]'),
  ]);
  for (const example of examples) {
    const layouts = [...example.querySelectorAll('.usx-layout')];
    const measurements = layouts.map((layout) => {
      const container = layout.querySelector('.usx-layout__single-column, .usx-layout__content');
      const bounds = container.getBoundingClientRect();
      const button = container.querySelector('.usx-layout__expand-button');
      return {
        height: bounds.height,
        headingOffsets: [...container.querySelectorAll('h1, h2')].map(
          (heading) => heading.getBoundingClientRect().top - bounds.top
        ),
        buttonOffset:
          getComputedStyle(button).display === 'none'
            ? null
            : button.getBoundingClientRect().top - bounds.top,
      };
    });
    await expect(measurements[1].height).toBeCloseTo(measurements[0].height, 0);
    await expect(measurements[1].headingOffsets).toEqual(measurements[0].headingOffsets);
    await expect(measurements[1].buttonOffset).toBe(measurements[0].buttonOffset);
  }
};

const checkComparison = async ({ canvasElement }, title, compact) => {
  const layouts = [...sectionElements(canvasElement, title)[0].querySelectorAll('.usx-layout')];
  const single = layouts[0].querySelector('[data-layout-content]').getBoundingClientRect();
  const gutter = parseFloat(getComputedStyle(layouts[0]).paddingLeft);
  const availableWidth = layouts[0].getBoundingClientRect().width - 2 * gutter;
  const rootFontSize = parseFloat(
    getComputedStyle(canvasElement.ownerDocument.documentElement).fontSize
  );
  const collapsedMaximum = (compact ? 40 : 64) * rootFontSize;
  const expandedMaximum = (compact ? 72 : 100) * rootFontSize;
  const minimumContentWidth = 32 * rootFontSize;
  const expectedSidebarWidth = (compact ? 12 : 16) * rootFontSize;
  const largeGutter = compact ? 2.5 * rootFontSize : 32;
  for (const layout of layouts) {
    const sidebars = [...layout.querySelectorAll('aside')];
    const sidebarsFit =
      availableWidth >=
      Math.min(collapsedMaximum, minimumContentWidth) + sidebars.length * expectedSidebarWidth;
    await waitFor(() =>
      expect(
        sidebars.filter((sidebar) => getComputedStyle(sidebar).display !== 'none').length
      ).toBe(sidebarsFit ? sidebars.length : 0)
    );
    const content = layout.querySelector('[data-layout-content]').getBoundingClientRect();
    const container = layout.querySelector(
      '.usx-layout__grid-container, .usx-layout__single-column'
    );
    const containerBounds = container.getBoundingClientRect();
    const bounds = layout.getBoundingClientRect();
    const visibleSidebars = sidebars.filter(
      (sidebar) => getComputedStyle(sidebar).display !== 'none'
    );
    const availableContentWidth =
      availableWidth -
      visibleSidebars.reduce((total, sidebar) => total + sidebar.getBoundingClientRect().width, 0);
    const contentMaximum = Math.max(
      0,
      (layout.classList.contains('usx-expanded') ? expandedMaximum : collapsedMaximum) - 2 * gutter
    );
    await expect(content.width).toBeCloseTo(Math.min(contentMaximum, availableContentWidth), 0);
    const canToggle =
      Math.min(availableContentWidth, Math.max(0, expandedMaximum - 2 * gutter)) -
        Math.min(availableContentWidth, Math.max(0, collapsedMaximum - 2 * gutter)) >
      1;
    const button = layout.querySelector('.usx-layout__expand-button');
    await waitFor(() => expect(getComputedStyle(button).display !== 'none').toBe(canToggle));
    for (const sidebar of visibleSidebars) {
      await expect(sidebar.getBoundingClientRect().width).toBeCloseTo(expectedSidebarWidth, 0);
      const left = sidebar.classList.contains('usx-layout__sidebar--left');
      await expect(
        parseFloat(getComputedStyle(sidebar)[left ? 'paddingRight' : 'paddingLeft'])
      ).toBe(largeGutter);
      await expect(
        parseFloat(getComputedStyle(sidebar)[left ? 'paddingLeft' : 'paddingRight'])
      ).toBe(0);
    }
    await expect(layout.querySelector('.usx-layout__expand-button')).toHaveAttribute(
      'aria-expanded',
      String(layout.classList.contains('usx-expanded'))
    );
    await expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
    await expect(
      Math.abs(containerBounds.left - bounds.left - (bounds.right - containerBounds.right))
    ).toBeLessThanOrEqual(1);
    const contentContainer = layout.querySelector(
      '.usx-layout__content, .usx-layout__single-column'
    );
    await expect(parseFloat(getComputedStyle(layout).paddingLeft)).toBe(gutter);
    await expect(parseFloat(getComputedStyle(layout).paddingRight)).toBe(gutter);
    await expect(parseFloat(getComputedStyle(contentContainer).paddingLeft)).toBe(0);
    await expect(parseFloat(getComputedStyle(contentContainer).paddingRight)).toBe(0);
    if (!visibleSidebars.length) {
      await expect(Math.abs(content.left - single.left)).toBeLessThanOrEqual(1);
      await expect(Math.abs(content.width - single.width)).toBeLessThanOrEqual(1);
    } else {
      const sidebarWidth = visibleSidebars.reduce(
        (total, sidebar) => total + sidebar.getBoundingClientRect().width,
        0
      );
      await expect(content.width).toBeCloseTo(
        Math.min(contentMaximum, availableWidth - sidebarWidth),
        0
      );
      const largestSidebar = Math.max(
        ...visibleSidebars.map((sidebar) => sidebar.getBoundingClientRect().width)
      );
      if (availableWidth >= contentMaximum + 2 * largestSidebar) {
        await expect(Math.abs(content.left - single.left)).toBeLessThanOrEqual(1);
        await expect(Math.abs(content.right - single.right)).toBeLessThanOrEqual(1);
      }
      if (availableWidth <= contentMaximum + sidebarWidth) {
        const items = [contentContainer, ...visibleSidebars].map((item) =>
          item.getBoundingClientRect()
        );
        await expect(
          Math.abs(Math.min(...items.map((item) => item.left)) - bounds.left - gutter)
        ).toBeLessThanOrEqual(1);
        await expect(
          Math.abs(Math.max(...items.map((item) => item.right)) - bounds.right + gutter)
        ).toBeLessThanOrEqual(1);
      }
    }
  }
};

const testComparison = async (context, title, compact) => {
  await checkComparison(context, title, compact);
  const layouts = sectionElements(context.canvasElement, title)[0].querySelectorAll('.usx-layout');
  for (const layout of layouts) {
    const button = layout.querySelector('.usx-layout__expand-button');
    if (getComputedStyle(button).display === 'none') continue;
    const content = layout.querySelector('[data-layout-content]');
    const collapsedWidth = content.getBoundingClientRect().width;
    await userEvent.click(button);
    await waitFor(() =>
      expect(content.getBoundingClientRect().width - collapsedWidth).toBeGreaterThan(1)
    );
    await waitFor(() => expect(button).toBeVisible());
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(button);
    await waitFor(() =>
      expect(content.getBoundingClientRect().width).toBeCloseTo(collapsedWidth, 0)
    );
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  }
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
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play: async (context) => {
    const step = (name, fn) => context.step(name, fn);
    await step('Expandable', () => testExpandable(context));
    await step('Vertical Spacing', () => testVerticalSpacing(context));
    await step('Responsiveness And Availability', () =>
      testComparison(context, 'Responsiveness And Availability', false)
    );
    await step('Themed Comparison', () => testComparison(context, 'Themed Comparison', true));
  },
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
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play: AllVariantsReact.play,
};
