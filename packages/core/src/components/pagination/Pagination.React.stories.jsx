import React, { useState } from 'react';
import Pagination from './Pagination';
import PaginationNavigation from './navigation/PaginationNavigation';
import PaginationStepOptions from './step-options/PaginationStepOptions';
import PaginationSummary from './summary/PaginationSummary';

export default {
  title: 'React/Pagination',
  component: Pagination,
  tags: ['autodocs'],
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

// ── Full component stories ─────────────────────────────────────────────────

export const Default = {
  args: {
    totalItems: 240,
    initialPage: 10,
    initialPageSize: 10,
  },
};

export const Unbounded = {
  args: {
    unbounded: true,
    initialPage: 5,
    showSummary: false,
  },
};

export const NoStepOptions = {
  args: {
    totalItems: 100,
    initialPage: 3,
    showStepOptions: false,
    initialPageSize: 10,
  },
};

export const NavigationOnly = {
  args: {
    totalItems: 100,
    initialPage: 5,
    showStepOptions: false,
    showSummary: false,
    initialPageSize: 10,
  },
};

export const SpanishLocale = {
  args: {
    totalItems: 240,
    initialPage: 10,
    initialPageSize: 10,
    ariaLabel: 'Paginación',
    prevLabel: 'Anterior',
    nextLabel: 'Siguiente',
    itemLabel: 'elementos',
  },
};

export const FewPages = {
  args: {
    totalItems: 25,
    initialPage: 1,
    initialPageSize: 10,
  },
};

export const LastPage = {
  args: {
    totalItems: 100,
    initialPage: 10,
    initialPageSize: 10,
  },
};

export const ArrowsOnly = {
  args: {
    totalItems: 100,
    initialPage: 5,
    initialPageSize: 10,
    arrowsOnly: true,
  },
};

export const ArrowsOnlyNoExtras = {
  name: 'Arrows Only (no summary or step options)',
  args: {
    totalItems: 100,
    initialPage: 5,
    initialPageSize: 10,
    arrowsOnly: true,
    showSummary: false,
    showStepOptions: false,
  },
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
  render: () => <PaginationSummary currentPage={3} pageSize={10} totalItems={100} />,
};

