import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/pagination/pagination.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/pagination/pagination.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Pagination.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle, snapshotId } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Pagination',
  tags: ['USWDS', 'autodocs'],
};

const ellipsis = '…';
const pageSequences = {
  Default: [1, ellipsis, 9, 10, 11, ellipsis, 24],
  CallbackLinks: [1, 2, 3, 4, 5, ellipsis, 10],
  HashLinks: [1, 2, 3],
  AsyncResults: [1, 2, 3, 4, 5],
  Unbounded: [1, ellipsis, 4, 5, 6, ellipsis],
  NoStepOptions: [1, 2, 3, 4, 5, ellipsis, 10],
  NavigationOnly: [1, ellipsis, 4, 5, 6, ellipsis, 10],
  SpanishLocale: [1, ellipsis, 9, 10, 11, ellipsis, 24],
  FewPages: [1, 2, 3],
  FirstPage: [1, 2, 3, 4, 5, ellipsis, 24],
  LastPage: [1, ellipsis, 6, 7, 8, 9, 10],
  ArrowsOnly: [],
  ArrowsOnlyNoExtras: [],
  IconOnlyArrows: [1, ellipsis, 9, 10, 11, ellipsis, 24],
  WithSummaryAndStepOptions: [1, ellipsis, 9, 10, 11, ellipsis, 24],
  NavigationBounded: [1, ellipsis, 9, 10, 11, ellipsis, 24],
  NavigationUnbounded: [1, ellipsis, 9, 10, 11, ellipsis],
  NavigationIconOnly: [1, ellipsis, 4, 5, 6, ellipsis, 20],
  NavigationUnboundedIconOnly: [1, ellipsis, 4, 5, 6, ellipsis],
};

const checkNavigation = (section, def, key) => async () => {
  const nav = section.matches('nav') ? section : section.querySelector('nav.usa-pagination');
  await expect(nav).toHaveAccessibleName(def.ariaLabel ?? 'Pagination');
  await expect(nav).toHaveClass('usa-pagination', 'usx-pagination__nav');
  await expect(Boolean(nav.classList.contains('usx-pagination__arrows-only'))).toBe(Boolean(def.arrowsOnly));
  const page = def.currentPage ?? def.initialPage;
  await expect(nav).toHaveAttribute('data-usx-pagination-current-page', String(page));
  await expect(nav).toHaveAttribute('data-usx-pagination-page-size', String(def.pageSize ?? def.initialPageSize ?? 10));
  await expect(nav).toHaveAttribute('data-usx-pagination-total-items', String(def.totalItems ?? ''));
  const last = def.totalPages;
  const prefix = def.pageUrlPrefix;
  const hrefFor = (number) => prefix?.startsWith('#')
    ? new RegExp(`^#(?:react-|django-)?${prefix.slice(1)}${number}$`)
    : prefix ? `${prefix}${number}` : '#';
  const checkHref = (link, href) => href instanceof RegExp
    ? expect(link.getAttribute('href')).toMatch(href)
    : expect(link).toHaveAttribute('href', href);
  const previous = nav.querySelector('.usa-pagination__previous-page');
  const next = nav.querySelector('.usa-pagination__next-page');
  await checkHref(previous, page === 1 ? '#' : hrefFor(page - 1));
  await checkHref(next, last === page ? '#' : hrefFor(page + 1));
  await expect(previous).toHaveAttribute('data-usx-pagination-page', String(page - 1));
  await expect(next).toHaveAttribute('data-usx-pagination-page', String(page + 1));
  await expect(previous).toHaveAttribute('aria-label', `${def.prevLabel ?? 'Previous'} page`);
  await expect(next).toHaveAttribute('aria-label', `${def.nextLabel ?? 'Next'} page`);
  await expect(Boolean(previous.hasAttribute('aria-disabled'))).toBe(page === 1);
  await expect(Boolean(next.hasAttribute('aria-disabled'))).toBe(last === page);
  if (page === 1) await expect(previous).toHaveAttribute('tabindex', '-1');
  if (last === page) await expect(next).toHaveAttribute('tabindex', '-1');
  const hiddenText = Boolean(def.hideLinkText);
  for (const arrow of [previous, next]) {
    await expect(Boolean(arrow.querySelector('.usa-pagination__link-text').classList.contains('usa-sr-only'))).toBe(hiddenText);
    await expect(arrow.querySelector('use').getAttribute('href')).toMatch(/#navigate_(before|next)$/);
  }
  const items = [...nav.querySelectorAll('.usa-pagination__list > .usa-pagination__item')].slice(1, -1);
  await expect(items.map((item) => item.classList.contains('usa-pagination__overflow') ? ellipsis : Number(item.textContent))).toEqual(pageSequences[key]);
  for (const item of items.filter((node) => node.classList.contains('usa-pagination__page-no'))) {
    const link = item.querySelector('a');
    const number = Number(link.textContent);
    await checkHref(link, hrefFor(number));
    await expect(link).toHaveAttribute('data-usx-pagination-page', String(number));
    await expect(link).toHaveAccessibleName(`Page ${number}`);
    await expect(Boolean(link.hasAttribute('aria-current'))).toBe(number === page);
  }
};

const checkStepOptions = async (section, def) => {
  const block = section.matches('.usx-pagination__step-options') ? section : section.querySelector('.usx-pagination__step-options');
  const select = block.querySelector('select');
  await expect(select.id).toMatch(snapshotId(def.stepOptionsId));
  await expect(select).toHaveAccessibleName('Items per page');
  await expect([...select.options].map((option) => option.value)).toEqual(['', '10', '25', '50', '100']);
  await expect(select.value).toBe(String(def.pageSize ?? def.initialPageSize ?? 10));
};

const checkSummary = async (section, def) => {
  const summary = section.matches('.usx-pagination__summary') ? section : section.querySelector('.usx-pagination__summary');
  const page = def.currentPage ?? def.initialPage;
  const size = def.pageSize ?? def.initialPageSize ?? 10;
  await expect(summary).toHaveAttribute('aria-live', 'polite');
  await expect(summary).toHaveAttribute('aria-atomic', 'true');
  await expect(summary).toHaveTextContent(`Showing ${((page - 1) * size) + 1}–${Math.min(page * size, def.totalItems)} of ${def.totalItems} ${def.itemLabel ?? 'items'}`);
};

const checks = Object.fromEntries(Object.entries(storyDefs).map(([key, def]) => [
  key === 'ArrowsOnlyNoExtras' ? 'Arrows Only (no summary or step options)' : sectionTitle(key),
  async (section) => {
    if (key === 'HashLinks') {
      await expect(section).toHaveClass('pagination-hash-example');
      for (const page of [1, 2, 3]) {
        await expect(section.querySelector(`[id$="pagination-hash-page-${page}"]`)).toHaveTextContent(`Page ${page} content`);
      }
      section = section.querySelector('.usx-pagination');
    }
    if (key === 'AsyncResults') {
      await expect(section).toHaveClass('pagination-async-example');
      await expect(section.querySelector('[role="status"]')).toHaveTextContent('Showing page 1');
      await expect([...section.querySelectorAll('.pagination-async-example__results li')].map((item) => item.textContent)).toEqual(['Record 1', 'Record 2']);
      section = section.querySelector('.usx-pagination');
    }
    await expect(section).toHaveClass('usx-pagination');
    await expect(section.querySelector('.usx-pagination__container')).not.toBeNull();
    await checkNavigation(section, { ...def, hideLinkText: def.hideLinkText ?? true }, key)();
    const hasSummary = def.showSummary !== false && typeof def.totalItems === 'number';
    const hasSteps = def.showStepOptions !== false;
    await expect(Boolean(section.querySelector('.usx-pagination__summary'))).toBe(hasSummary);
    await expect(Boolean(section.querySelector('.usx-pagination__step-options'))).toBe(hasSteps);
    if (hasSummary) await checkSummary(section, def);
    if (hasSteps) await checkStepOptions(section, def);
  },
]));

const subNavigation = {
  'Sub: Navigation (bounded)': ['NavigationBounded', { currentPage: 10, totalPages: 24 }],
  'Sub: Navigation (unbounded)': ['NavigationUnbounded', { currentPage: 10 }],
  'Sub: Navigation (icon-only prev/next)': ['NavigationIconOnly', { currentPage: 5, totalPages: 20, hideLinkText: true }],
  'Sub: Navigation (unbounded, icon-only)': ['NavigationUnboundedIconOnly', { currentPage: 5, hideLinkText: true }],
};
for (const [title, [key, def]] of Object.entries(subNavigation)) checks[title] = (section) => checkNavigation(section, def, key)();
checks['Sub: Step Options'] = (section) => checkStepOptions(section, { stepOptionsId: 'pagination-sub-step-options', pageSize: 10 });
checks['Sub: Summary'] = (section) => checkSummary(section, { currentPage: 3, pageSize: 10, totalItems: 100 });
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
