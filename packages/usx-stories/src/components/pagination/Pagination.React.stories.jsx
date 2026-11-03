import config from '../../../../usx-react/src/components/pagination/config.json';
import React, { useState } from 'react';
import Pagination from '../../../../usx-react/src/components/pagination/Pagination.tsx';
import PaginationNavigation, {
  getPageItems,
  getUnboundedPageItems,
} from '../../../../usx-react/src/components/pagination/navigation/PaginationNavigation.tsx';
import PaginationStepOptions from '../../../../usx-react/src/components/pagination/step-options/PaginationStepOptions.tsx';
import PaginationSummary from '../../../../usx-react/src/components/pagination/summary/PaginationSummary.tsx';
import { demoRows, fetchDemoRows, pageFromClick, sizeFromChange } from './asyncDemo.js';
import { waitFor } from 'storybook/test';

export default {
  title: 'React/USWDS/Pagination',
  component: Pagination,
  tags: ['USWDS', 'autodocs'],
  excludeStories: ['storyDefs'],
  argTypes: {
    totalItems: { control: 'number' },
    initialPage: { control: 'number' },
    initialPageSize: { control: 'number' },
    unbounded: { control: 'boolean' },
    showStepOptions: { control: 'boolean' },
    showSummary: { control: 'boolean' },
    prevLabel: { control: 'text' },
    nextLabel: { control: 'text' },
    itemLabel: { control: 'text' },
  },
};

// ── Exportable story definitions (reused by Django stories) ───────────────

export const storyDefs = {
  Default: config.default,
  CallbackLinks: {
    totalItems: 100,
    initialPage: 2,
    initialPageSize: 10,
    currentPage: 2,
    totalPages: 10,
  },
  HashLinks: {
    totalItems: 30,
    initialPage: 1,
    initialPageSize: 10,
    currentPage: 1,
    totalPages: 3,
    pageUrlPrefix: '#pagination-hash-page-',
  },
  AsyncResults: {
    totalItems: 42,
    initialPage: 1,
    initialPageSize: 10,
    currentPage: 1,
    pageSize: 10,
    totalPages: 5,
    pageUrlPrefix: '?page=',
  },
  Unbounded: {
    unbounded: true,
    initialPage: 5,
    showSummary: false,
    currentPage: 5,
    pageUrlPrefix: '?page=',
  },
  NoStepOptions: {
    totalItems: 100,
    initialPage: 3,
    showStepOptions: false,
    initialPageSize: 10,
    currentPage: 3,
    totalPages: 10,
    pageUrlPrefix: '?page=',
  },
  NavigationOnly: {
    totalItems: 100,
    initialPage: 5,
    showStepOptions: false,
    showSummary: false,
    initialPageSize: 10,
    currentPage: 5,
    totalPages: 10,
    pageUrlPrefix: '?page=',
  },
  SpanishLocale: {
    totalItems: 240,
    initialPage: 10,
    initialPageSize: 10,
    currentPage: 10,
    totalPages: 24,
    pageUrlPrefix: '?pagina=',
    ariaLabel: 'Paginación',
    prevLabel: 'Anterior',
    nextLabel: 'Siguiente',
    itemLabel: 'elementos',
    showSummary: true,
    firstItem: 91,
    lastItem: 100,
  },
  FewPages: {
    totalItems: 25,
    initialPage: 1,
    initialPageSize: 10,
    currentPage: 1,
    totalPages: 3,
    pageUrlPrefix: '?page=',
  },
  FirstPage: {
    totalItems: 240,
    initialPage: 1,
    initialPageSize: 10,
    currentPage: 1,
    totalPages: 24,
    pageUrlPrefix: '?page=',
  },
  LastPage: {
    totalItems: 100,
    initialPage: 10,
    initialPageSize: 10,
    currentPage: 10,
    totalPages: 10,
    pageUrlPrefix: '?page=',
  },
  ArrowsOnly: {
    totalItems: 100,
    initialPage: 5,
    initialPageSize: 10,
    currentPage: 5,
    totalPages: 10,
    pageUrlPrefix: '?page=',
    arrowsOnly: true,
  },
  ArrowsOnlyNoExtras: {
    totalItems: 100,
    initialPage: 5,
    initialPageSize: 10,
    currentPage: 5,
    totalPages: 10,
    pageUrlPrefix: '?page=',
    arrowsOnly: true,
    showSummary: false,
    showStepOptions: false,
  },
  IconOnlyArrows: {
    totalItems: 240,
    initialPage: 10,
    initialPageSize: 10,
    currentPage: 10,
    totalPages: 24,
    pageUrlPrefix: '?page=',
    hideLinkText: true,
  },
  WithSummaryAndStepOptions: {
    totalItems: 240,
    initialPage: 10,
    initialPageSize: 10,
    currentPage: 10,
    totalPages: 24,
    pageUrlPrefix: '?page=',
    showSummary: true,
    firstItem: 91,
    lastItem: 100,
    showStepOptions: true,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },
};

// Django renders server-side, so it is handed the page list React computes itself.
for (const [key, def] of Object.entries(storyDefs)) {
  def.stepOptionsId = `pagination-${key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}-step-options`;
  if (def.currentPage) {
    def.pages = def.totalPages
      ? getPageItems(def.currentPage, def.totalPages)
      : getUnboundedPageItems(def.currentPage);
  }
}

// ── Full component stories ─────────────────────────────────────────────────

export const Default = {
  args: storyDefs.Default,
};

const connectedCallbackNavs = new WeakSet();
export const CallbackLinks = {
  args: storyDefs.CallbackLinks,
  play: async ({ canvasElement }) => {
    const nav = await waitFor(() => {
      const node = canvasElement.querySelector('nav.usx-pagination__nav');
      if (!node) throw new Error('Pagination has not rendered');
      return node;
    });
    if (connectedCallbackNavs.has(nav)) return;
    connectedCallbackNavs.add(nav);
    nav.addEventListener('click', (event) => {
      const request = pageFromClick(event, nav);
      if (!request) return;
      event.preventDefault();
      window.exampleEventTrigger?.(event.target.closest('[data-usx-pagination-page]').getAttribute('aria-label'));
    });
  },
};

export const HashLinks = {
  args: storyDefs.HashLinks,
  render: (args) => (
    <div className="pagination-hash-example">
      <div><Pagination {...args} /></div>
      {[1, 2, 3].map((page) => (
        <div id={`pagination-hash-page-${page}`} key={page}>Page {page} content</div>
      ))}
    </div>
  ),
  parameters: { docs: { description: { story: 'Native fragment links navigate to matching page sections without any Pagination JavaScript.' } } },
};

function AsyncResultsRender(args) {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [rows, setRows] = useState(() => demoRows(1, 10));
  const [status, setStatus] = useState('Showing page 1');
  const onPageChange = async (nextPage, nextSize) => {
    setStatus(`Loading page ${nextPage}`);
    const nextRows = await fetchDemoRows(nextPage, nextSize, args.totalItems);
    setRows(nextRows);
    setPage(nextPage);
    setSize(nextSize);
    setStatus(`Showing page ${nextPage}`);
  };
  const handleClick = (event) => {
    const request = pageFromClick(event, event.currentTarget);
    if (!request) return;
    event.preventDefault();
    if (request.page !== page) void onPageChange(request.page, request.pageSize);
  };
  const handleChange = (event) => {
    const request = sizeFromChange(event, event.currentTarget);
    if (request) void onPageChange(request.page, request.pageSize);
  };
  return (
    <div className="pagination-async-example" onClick={handleClick} onChange={handleChange}>
      <p role="status" aria-live="polite">{status}</p>
      <ul className="pagination-async-example__results">{rows.map((row) => <li key={row}>{row}</li>)}</ul>
      <div>
        <Pagination
          {...args}
          currentPage={page}
          pageSize={size}
        />
      </div>
    </div>
  );
}

export const AsyncResults = {
  args: storyDefs.AsyncResults,
  render: AsyncResultsRender,
  parameters: { docs: { description: { story: 'Consumer code handles link clicks and page-size changes on the surrounding element, fetches result data, then supplies currentPage and pageSize. Pagination renders markup only.' } } },
};

export const Unbounded = {
  args: storyDefs.Unbounded,
};

export const NoStepOptions = {
  args: storyDefs.NoStepOptions,
};

export const NavigationOnly = {
  args: storyDefs.NavigationOnly,
};

export const SpanishLocale = {
  args: storyDefs.SpanishLocale,
};

export const FewPages = {
  args: storyDefs.FewPages,
};

export const FirstPage = {
  args: storyDefs.FirstPage,
};

export const LastPage = {
  args: storyDefs.LastPage,
};

export const ArrowsOnly = {
  args: storyDefs.ArrowsOnly,
};

export const ArrowsOnlyNoExtras = {
  name: 'Arrows Only (no summary or step options)',
  args: storyDefs.ArrowsOnlyNoExtras,
};

export const IconOnlyArrows = {
  args: storyDefs.IconOnlyArrows,
};

export const WithSummaryAndStepOptions = {
  args: storyDefs.WithSummaryAndStepOptions,
};

// ── Subcomponent stories ───────────────────────────────────────────────────

export const NavigationBounded = {
  name: 'Sub: Navigation (bounded)',
  render: () => <PaginationNavigation currentPage={10} totalPages={24} />,
};

export const NavigationUnbounded = {
  name: 'Sub: Navigation (unbounded)',
  render: () => <PaginationNavigation currentPage={10} />,
};

export const NavigationIconOnly = {
  name: 'Sub: Navigation (icon-only prev/next)',
  render: () => <PaginationNavigation currentPage={5} totalPages={20} hideLinkText />,
};

export const NavigationUnboundedIconOnly = {
  name: 'Sub: Navigation (unbounded, icon-only)',
  render: () => <PaginationNavigation currentPage={5} hideLinkText />,
};

export const StepOptionsSubcomponent = {
  name: 'Sub: Step Options',
  render: () => <PaginationStepOptions id="pagination-sub-step-options" pageSize={10} pageSizeOptions={[10, 25, 50, 100]} />,
};

export const SummarySubcomponent = {
  name: 'Sub: Summary',
  render: () => (
    <PaginationSummary currentPage={3} pageSize={10} totalItems={100} />
  ),
};
