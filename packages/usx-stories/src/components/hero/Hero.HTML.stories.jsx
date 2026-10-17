import React from 'react';
import { expect, within } from 'storybook/test';
import reactSnapshot from '../../../../usx-react/src/components/hero/hero.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/hero/hero.django-snapshot.html?raw';

export default {
  title: 'HTML/USX/Hero',
  tags: ['USX', 'autodocs'],
};

// Each variant is the section following its preview heading.
const heroFor = (canvasElement, name) => {
  const heading = [...canvasElement.querySelectorAll('.site-preview-heading')].find(
    (element) => element.textContent === name
  );
  return heading.nextElementSibling;
};

const rootFontSize = (canvasElement) =>
  parseFloat(getComputedStyle(canvasElement.ownerDocument.documentElement).fontSize);

const testRightAligned = async ({ canvasElement }) => {
  const hero = heroFor(canvasElement, 'Right Aligned');
  await expect(hero).toHaveClass('usx-hero--content-right');
  await expect(hero.style.backgroundPosition).toBe('left center');
  await expect(hero).toHaveStyle({ backgroundPosition: '0% 50%' });
};

const testNarrowCallout = async ({ canvasElement }) => {
  const hero = heroFor(canvasElement, 'Narrow Callout');
  const callout = hero.querySelector('.usx-hero__callout');
  await expect(callout.style.maxWidth).toBe('28rem');
  await expect(callout.getBoundingClientRect().width).toBeLessThanOrEqual(
    28 * rootFontSize(canvasElement) + 1
  );
  await expect(hero.scrollWidth).toBeLessThanOrEqual(hero.clientWidth);
};

const testUnboxed = async ({ canvasElement }) => {
  const hero = heroFor(canvasElement, 'Unboxed');
  await expect(hero).toHaveClass('usx-hero--unboxed');
  await expect(hero.querySelector('.usx-hero__callout')).toHaveStyle({
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: '0px',
  });
};

const testLongContent = async ({ canvasElement }) => {
  const hero = heroFor(canvasElement, 'Long Content');
  const inner = hero.querySelector('.usx-hero__inner');
  const heroBounds = hero.getBoundingClientRect();
  const innerStyle = getComputedStyle(inner);
  const paddingTop = parseFloat(innerStyle.paddingTop);
  const paddingBottom = parseFloat(innerStyle.paddingBottom);
  const minimumHeight = parseFloat(getComputedStyle(hero).minHeight);
  const fontSize = rootFontSize(canvasElement);
  const wide = canvasElement.ownerDocument.defaultView.matchMedia('(min-width: 40em)').matches;
  const expectedBlockPadding = (wide ? 4 : 3) * fontSize;
  const expectedInlinePadding = (wide ? 2 : 1.25) * fontSize;

  await expect(paddingTop).toBe(expectedBlockPadding);
  await expect(paddingBottom).toBe(expectedBlockPadding);
  await expect(parseFloat(innerStyle.paddingLeft)).toBe(expectedInlinePadding);
  await expect(parseFloat(innerStyle.paddingRight)).toBe(expectedInlinePadding);
  await expect(heroBounds.height + 1).toBeGreaterThanOrEqual(
    Math.max(minimumHeight, inner.getBoundingClientRect().height)
  );
  await expect(hero.scrollWidth).toBeLessThanOrEqual(hero.clientWidth);
  for (const content of inner.children) {
    const bounds = content.getBoundingClientRect();
    await expect(bounds.top - heroBounds.top + 1).toBeGreaterThanOrEqual(paddingTop);
    await expect(heroBounds.bottom - bounds.bottom + 1).toBeGreaterThanOrEqual(paddingBottom);
  }
};

const testSectionHeading = async ({ canvasElement }) => {
  const hero = heroFor(canvasElement, 'Section Heading');
  const scope = within(hero);
  await expect(
    scope.getByRole('heading', { level: 2, name: /Public services/ })
  ).toBeInTheDocument();
  await expect(scope.getByRole('heading', { level: 3, name: 'Need a hand?' })).toBeInTheDocument();
  await expect(scope.getByRole('link', { name: 'Contact our team' })).toHaveAttribute(
    'href',
    '#contact'
  );
  await expect(hero).toHaveClass('usx-hero--split');
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
    await step('Right Aligned', () => testRightAligned(context));
    await step('Narrow Callout', () => testNarrowCallout(context));
    await step('Unboxed', () => testUnboxed(context));
    await step('Long Content', () => testLongContent(context));
    await step('Section Heading', () => testSectionHeading(context));
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
