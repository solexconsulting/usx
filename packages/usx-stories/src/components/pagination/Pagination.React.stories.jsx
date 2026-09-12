import React, { useState } from 'react';
import Pagination from '../../../../core/src/components/pagination/Pagination.tsx';
import PaginationNavigation from '../../../../core/src/components/pagination/navigation/PaginationNavigation.tsx';
import PaginationStepOptions from '../../../../core/src/components/pagination/step-options/PaginationStepOptions.tsx';
import PaginationSummary from '../../../../core/src/components/pagination/summary/PaginationSummary.tsx';

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

// ── Shared page-item arrays (for Django parity) ───────────────────────────

const PAGES_MIDDLE = [
  { type: 'page', page: 1 },
  { type: 'ellipsis' },
  { type: 'page', page: 9 },
  { type: 'page', page: 10 },
  { type: 'page', page: 11 },
  { type: 'ellipsis' },
  { type: 'page', page: 24 },
];

const PAGES_NEAR_START = [
  { type: 'page', page: 1 },
  { type: 'page', page: 2 },
  { type: 'page', page: 3 },
  { type: 'page', page: 4 },
  { type: 'page', page: 5 },
  { type: 'ellipsis' },
  { type: 'page', page: 24 },
];

const PAGES_NEAR_END = [
  { type: 'page', page: 1 },
  { type: 'ellipsis' },
  { type: 'page', page: 20 },
  { type: 'page', page: 21 },
  { type: 'page', page: 22 },
  { type: 'page', page: 23 },
  { type: 'page', page: 24 },
];

const PAGES_FEW = [
  { type: 'page', page: 1 },
  { type: 'page', page: 2 },
  { type: 'page', page: 3 },
];

const PAGES_UNBOUNDED = [
  { type: 'page', page: 1 },
  { type: 'ellipsis' },
  { type: 'page', page: 4 },
  { type: 'page', page: 5 },
  { type: 'page', page: 6 },
  { type: 'ellipsis' },
];

// ── Exportable story definitions (reused by Django stories) ───────────────

export const storyDefs = {
  Default: {
    totalItems: 240,
    initialPage: 10,
    initialPageSize: 10,
    currentPage: 10,
    totalPages: 24,
    pages: PAGES_MIDDLE,
    pageUrlPrefix: '?page=',
  },
  Unbounded: {
    unbounded: true,
    initialPage: 5,
    showSummary: false,
    currentPage: 5,
    pages: PAGES_UNBOUNDED,
    pageUrlPrefix: '?page=',
  },
  NoStepOptions: {
    totalItems: 100,
    initialPage: 3,
    showStepOptions: false,
    initialPageSize: 10,
    currentPage: 3,
    totalPages: 10,
    pages: PAGES_MIDDLE,
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
    pages: PAGES_MIDDLE,
    pageUrlPrefix: '?page=',
  },
  SpanishLocale: {
    totalItems: 240,
    initialPage: 10,
    initialPageSize: 10,
    currentPage: 10,
    totalPages: 24,
    pages: PAGES_MIDDLE,
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
    pages: PAGES_FEW,
    pageUrlPrefix: '?page=',
  },
  FirstPage: {
    totalItems: 240,
    initialPage: 1,
    initialPageSize: 10,
    currentPage: 1,
    totalPages: 24,
    pages: PAGES_NEAR_START,
    pageUrlPrefix: '?page=',
  },
  LastPage: {
    totalItems: 100,
    initialPage: 10,
    initialPageSize: 10,
    currentPage: 10,
    totalPages: 10,
    pages: PAGES_NEAR_END,
    pageUrlPrefix: '?page=',
  },
  ArrowsOnly: {
    totalItems: 100,
    initialPage: 5,
    initialPageSize: 10,
    currentPage: 5,
    totalPages: 10,
    pages: PAGES_MIDDLE,
    pageUrlPrefix: '?page=',
    arrowsOnly: true,
  },
  ArrowsOnlyNoExtras: {
    totalItems: 100,
    initialPage: 5,
    initialPageSize: 10,
    currentPage: 5,
    totalPages: 10,
    pages: PAGES_MIDDLE,
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
    pages: PAGES_MIDDLE,
    pageUrlPrefix: '?page=',
    hideLinkText: true,
  },
  WithSummaryAndStepOptions: {
    totalItems: 240,
    initialPage: 10,
    initialPageSize: 10,
    currentPage: 10,
    totalPages: 24,
    pages: PAGES_MIDDLE,
    pageUrlPrefix: '?page=',
    showSummary: true,
    firstItem: 91,
    lastItem: 100,
    showStepOptions: true,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },
};

// ── Full component stories ─────────────────────────────────────────────────

export const Default = {
  args: storyDefs.Default,
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
  render: () => {
    const [page, setPage] = useState(10);
    return (
      <PaginationNavigation
        currentPage={page}
        totalPages={24}
        onPageChange={setPage}
      />
    );
  },
};

export const NavigationUnbounded = {
  name: 'Sub: Navigation (unbounded)',
  render: () => {
    const [page, setPage] = useState(10);
    return (
      <PaginationNavigation
        currentPage={page}
        onPageChange={setPage}
      />
    );
  },
};

export const NavigationIconOnly = {
  name: 'Sub: Navigation (icon-only prev/next)',
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <PaginationNavigation
        currentPage={page}
        totalPages={20}
        onPageChange={setPage}
        hideLinkText
      />
    );
  },
};

export const NavigationUnboundedIconOnly = {
  name: 'Sub: Navigation (unbounded, icon-only)',
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <PaginationNavigation
        currentPage={page}
        onPageChange={setPage}
        hideLinkText
      />
    );
  },
};

export const StepOptionsSubcomponent = {
  name: 'Sub: Step Options',
  render: () => {
    const [size, setSize] = useState(10);
    return (
      <PaginationStepOptions
        pageSize={size}
        pageSizeOptions={[10, 25, 50, 100]}
        onPageSizeChange={setSize}
      />
    );
  },
};

export const SummarySubcomponent = {
  name: 'Sub: Summary',
  render: () => (
    <PaginationSummary currentPage={3} pageSize={10} totalItems={100} />
  ),
};

