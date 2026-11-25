import config from '../../../../usx-react/src/components/pagination/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Pagination.React.stories.jsx';
import { getPageItems, getUnboundedPageItems } from '../../../../usx-react/src/components/pagination/navigation/PaginationNavigation.tsx';
import { consumerSetup } from '../../utils/consumerSetup.jsx';
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
export const CallbackLinks = {
  ...callbackStory,
  decorators: [
    consumerSetup((root) => {
      const click = (event) => {
        const nav = event.target.closest('nav.usx-pagination__nav');
        if (!nav) return;
        const link = event.target.closest?.('a[href="#"]');
        if (!link || !nav.contains(link) || link.getAttribute('aria-disabled') === 'true') return;
        event.preventDefault();
        window.exampleEventTrigger?.(link.getAttribute('aria-label'));
      };
      root.addEventListener('click', click);
      return () => root.removeEventListener('click', click);
    }),
  ],
};

function HashLinksStory(args) {
  const { html, error } = useDjangoRenderedHtml('pagination', toDjangoArgs(args));
  if (error)
    return (
      <div className="usa-error-message usx-error-message">Error rendering component: {error}</div>
    );
  return (
    <div className="pagination-hash-example">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {[1, 2, 3].map((page) => (
        <div id={`pagination-hash-page-${page}`} key={page}>
          Page {page} content
        </div>
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
  if (error)
    return (
      <div className="usa-error-message usx-error-message">Error rendering component: {error}</div>
    );
  return (
    <div className="pagination-async-example">
      <p role="status" aria-live="polite">
        Showing page 1
      </p>
      <ul className="pagination-async-example__results">
        {demoRows(1, 10).map((row) => (
          <li key={row}>{row}</li>
        ))}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export const AsyncResults = {
  args: storyDefs.AsyncResults,
  render: (args) => <AsyncResultsStory {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Consumer code handles page links and the page-size select, fetches data and freshly rendered Django Pagination HTML, then replaces only the component node. Pagination renders markup only.',
      },
    },
  },
  decorators: [
    consumerSetup((root, args) => {
      let pending = false;
      const load = async ({ page, pageSize }) => {
        const example = root.querySelector('.pagination-async-example');
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
          list.replaceChildren(
            ...rows.map((text) => {
              const item = list.ownerDocument.createElement('li');
              item.textContent = text;
              return item;
            })
          );
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
      const click = (event) => {
        const example = event.target.closest('.pagination-async-example');
        if (!example) return;
        const request = pageFromClick(event, example);
        if (!request) return;
        event.preventDefault();
        if (
          request.page !==
          Number(example.querySelector('nav.usx-pagination__nav')?.dataset.usxPaginationCurrentPage)
        )
          void load(request);
      };
      const change = (event) => {
        const example = event.target.closest('.pagination-async-example');
        if (!example) return;
        const request = sizeFromChange(event, example);
        if (request) void load(request);
      };
      root.addEventListener('click', click);
      root.addEventListener('change', change);
      return () => {
        root.removeEventListener('click', click);
        root.removeEventListener('change', change);
      };
    }),
  ],
};
export const Unbounded = createStory(toDjangoArgs(storyDefs.Unbounded));
export const NoStepOptions = createStory(toDjangoArgs(storyDefs.NoStepOptions));
export const NavigationOnly = createStory(toDjangoArgs(storyDefs.NavigationOnly));
export const SpanishLocale = createStory(toDjangoArgs(storyDefs.SpanishLocale));
export const FewPages = createStory(toDjangoArgs(storyDefs.FewPages));
export const SinglePage = createStory(toDjangoArgs(storyDefs.SinglePage));
export const NoResults = createStory(toDjangoArgs(storyDefs.NoResults));
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
