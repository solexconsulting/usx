import config from '../../../../usx-react/src/components/pagination/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Pagination.React.stories.jsx';
import { getPageItems, getUnboundedPageItems } from '../../../../usx-react/src/components/pagination/navigation/PaginationNavigation.tsx';
import { waitFor } from 'storybook/test';
import { fetchComponentHtml, useDjangoRenderedHtml } from '../../utils/djangoComponent.js';
import { demoRows, fetchDemoRows, pageFromClick, sizeFromChange } from './asyncDemo.js';
import React from 'react';

export default {
  title: 'Django/USWDS/Pagination',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'pagination' });
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const Default = createStory(toDjangoArgs(storyDefs.Default));
const callbackStory = createStory(toDjangoArgs(storyDefs.CallbackLinks));
const connected = new WeakSet();
export const CallbackLinks = {
  ...callbackStory,
  play: async ({ canvasElement }) => {
    const nav = await waitFor(() => {
      const node = canvasElement.querySelector('nav.usx-pagination__nav');
      if (!node) throw new Error('Pagination has not rendered');
      return node;
    });
    if (connected.has(nav)) return;
    connected.add(nav);
    nav.addEventListener('click', (event) => {
      const link = event.target.closest?.('a[href="#"]');
      if (!link || !nav.contains(link) || link.getAttribute('aria-disabled') === 'true') return;
      event.preventDefault();
      window.exampleEventTrigger?.(link.getAttribute('aria-label'));
    });
  },
};

function HashLinksStory(args) {
  const { html, error } = useDjangoRenderedHtml('pagination', toDjangoArgs(args));
  if (error) return <div className="usa-error-message usx-error-message">Error rendering component: {error}</div>;
  return (
    <div className="pagination-hash-example">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {[1, 2, 3].map((page) => (
        <div id={`pagination-hash-page-${page}`} key={page}>Page {page} content</div>
      ))}
    </div>
  );
}

export const HashLinks = {
  args: storyDefs.HashLinks,
  render: (args) => <HashLinksStory {...args} />,
  parameters: { docs: { description: { story: 'Native fragment links navigate to matching page sections without any Pagination JavaScript.' } } },
};

function AsyncResultsStory(args) {
  const { html, error } = useDjangoRenderedHtml('pagination', toDjangoArgs(args));
  if (error) return <div className="usa-error-message usx-error-message">Error rendering component: {error}</div>;
  return (
    <div className="pagination-async-example">
      <p role="status" aria-live="polite">Showing page 1</p>
      <ul className="pagination-async-example__results">{demoRows(1, 10).map((row) => <li key={row}>{row}</li>)}</ul>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

const asyncConnected = new WeakSet();
export const AsyncResults = {
  args: storyDefs.AsyncResults,
  render: (args) => <AsyncResultsStory {...args} />,
  parameters: { docs: { description: { story: 'Consumer code handles page links and the page-size select, fetches data and freshly rendered Django Pagination HTML, then replaces only the component node. Pagination renders markup only.' } } },
  play: async ({ canvasElement, args }) => {
    const example = await waitFor(() => {
      const node = canvasElement.querySelector('.pagination-async-example nav.usx-pagination__nav')?.closest('.pagination-async-example');
      if (!node) throw new Error('Async pagination example has not rendered');
      return node;
    });
    if (asyncConnected.has(example)) return;
    asyncConnected.add(example);
    let pending = false;
    const load = async ({ page, pageSize }) => {
      if (pending) return;
      pending = true;
      const status = example.querySelector('[role="status"]');
      status.textContent = `Loading page ${page}`;
      try {
        const totalPages = Math.ceil(args.totalItems / pageSize);
        const nextArgs = toDjangoArgs({
          ...args,
          currentPage: page,
          pageSize,
          totalPages,
          pages: getPageItems(page, totalPages),
        });
        const [rows, html] = await Promise.all([
          fetchDemoRows(page, pageSize, args.totalItems),
          fetchComponentHtml('pagination', nextArgs),
        ]);
        const list = example.querySelector('.pagination-async-example__results');
        list.replaceChildren(...rows.map((text) => {
          const item = list.ownerDocument.createElement('li');
          item.textContent = text;
          return item;
        }));
        const template = example.ownerDocument.createElement('template');
        template.innerHTML = html;
        const current = example.querySelector('.usx-pagination');
        const replacement = template.content.querySelector('.usx-pagination');
        if (!current || !replacement) throw new Error('Pagination HTML is missing');
        current.replaceWith(replacement);
        status.textContent = `Showing page ${page}`;
      } catch (error) {
        status.textContent = 'Unable to load results';
        throw error;
      } finally {
        pending = false;
      }
    };
    example.addEventListener('click', (event) => {
      const request = pageFromClick(event, example);
      if (!request) return;
      event.preventDefault();
      if (request.page !== Number(example.querySelector('nav.usx-pagination__nav')?.dataset.usxPaginationCurrentPage)) void load(request);
    });
    example.addEventListener('change', (event) => {
      const request = sizeFromChange(event, example);
      if (request) void load(request);
    });
  },
};
export const Unbounded = createStory(toDjangoArgs(storyDefs.Unbounded));
export const NoStepOptions = createStory(toDjangoArgs(storyDefs.NoStepOptions));
export const NavigationOnly = createStory(toDjangoArgs(storyDefs.NavigationOnly));
export const SpanishLocale = createStory(toDjangoArgs(storyDefs.SpanishLocale));
export const FewPages = createStory(toDjangoArgs(storyDefs.FewPages));
export const FirstPage = createStory(toDjangoArgs(storyDefs.FirstPage));
export const LastPage = createStory(toDjangoArgs(storyDefs.LastPage));
export const ArrowsOnly = createStory(toDjangoArgs(storyDefs.ArrowsOnly));
export const ArrowsOnlyNoExtras = {
  ...createStory(toDjangoArgs(storyDefs.ArrowsOnlyNoExtras)),
  name: 'Arrows Only (no summary or step options)',
};
export const IconOnlyArrows = createStory(toDjangoArgs(storyDefs.IconOnlyArrows));
export const WithSummaryAndStepOptions = createStory(toDjangoArgs(storyDefs.WithSummaryAndStepOptions));

const navigationArgs = (page, totalPages, hideLinkText = false) => ({
  renderPart: 'navigation',
  currentPage: page,
  ...(totalPages == null
    ? { unbounded: true, pages: getUnboundedPageItems(page) }
    : { totalPages, pages: getPageItems(page, totalPages) }),
  hideLinkText,
});
export const NavigationBounded = { ...createStory(navigationArgs(10, 24)), name: 'Sub: Navigation (bounded)' };
export const NavigationUnbounded = { ...createStory(navigationArgs(10)), name: 'Sub: Navigation (unbounded)' };
export const NavigationIconOnly = { ...createStory(navigationArgs(5, 20, true)), name: 'Sub: Navigation (icon-only prev/next)' };
export const NavigationUnboundedIconOnly = { ...createStory(navigationArgs(5, null, true)), name: 'Sub: Navigation (unbounded, icon-only)' };
export const StepOptionsSubcomponent = {
  ...createStory({ renderPart: 'step-options', pageSize: 10, pageSizeOptions: [10, 25, 50, 100], stepOptionsId: 'pagination-sub-step-options' }),
  name: 'Sub: Step Options',
};
export const SummarySubcomponent = {
  ...createStory({ renderPart: 'summary', currentPage: 3, pageSize: 10, totalItems: 100 }),
  name: 'Sub: Summary',
};
