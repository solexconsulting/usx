import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';
import config from './config.json';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Pagination',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

// ── Shared page-item arrays ────────────────────────────────────────────────
// These mirror the output of getPageItems() in PaginationNavigation.jsx.

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
  { type: 'page', page: 9 },
  { type: 'page', page: 10 },
  { type: 'page', page: 11 },
  { type: 'ellipsis' },
];

// ── Stories ────────────────────────────────────────────────────────────────

export const Default = {
  args: {
    currentPage: 10,
    totalPages: 24,
    pages: PAGES_MIDDLE,
    pageUrlPrefix: '?page=',
  },
  render: djangoComponent('pagination'),
};

export const NearStart = {
  args: {
    currentPage: 2,
    totalPages: 24,
    pages: PAGES_NEAR_START,
    pageUrlPrefix: '?page=',
  },
  render: djangoComponent('pagination'),
};

export const NearEnd = {
  args: {
    currentPage: 22,
    totalPages: 24,
    pages: PAGES_NEAR_END,
    pageUrlPrefix: '?page=',
  },
  render: djangoComponent('pagination'),
};

export const FewPages = {
  args: {
    currentPage: 2,
    totalPages: 3,
    pages: PAGES_FEW,
    pageUrlPrefix: '?page=',
  },
  render: djangoComponent('pagination'),
};

export const Unbounded = {
  args: {
    currentPage: 10,
    unbounded: true,
    pages: PAGES_UNBOUNDED,
    pageUrlPrefix: '?page=',
  },
  render: djangoComponent('pagination'),
};

export const WithSummaryAndStepOptions = {
  args: {
    currentPage: 10,
    totalPages: 24,
    pages: PAGES_MIDDLE,
    pageUrlPrefix: '?page=',
    showSummary: true,
    firstItem: 91,
    lastItem: 100,
    totalItems: 240,
    showStepOptions: true,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },
  render: djangoComponent('pagination'),
};

export const ArrowsOnly = {
  args: {
    currentPage: 10,
    totalPages: 24,
    pages: PAGES_MIDDLE,
    pageUrlPrefix: '?page=',
    arrowsOnly: true,
    showSummary: true,
    firstItem: 91,
    lastItem: 100,
    totalItems: 240,
    showStepOptions: true,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },
  render: djangoComponent('pagination'),
};

export const IconOnlyArrows = {
  args: {
    currentPage: 10,
    totalPages: 24,
    pages: PAGES_MIDDLE,
    pageUrlPrefix: '?page=',
    hideLinkText: true,
  },
  render: djangoComponent('pagination'),
};

export const SpanishLocale = {
  args: {
    currentPage: 10,
    totalPages: 24,
    pages: PAGES_MIDDLE,
    pageUrlPrefix: '?pagina=',
    ariaLabel: 'Paginación',
    prevLabel: 'Anterior',
    nextLabel: 'Siguiente',
    showSummary: true,
    firstItem: 91,
    lastItem: 100,
    totalItems: 240,
    itemLabel: 'elementos',
  },
  render: djangoComponent('pagination'),
};

export const FirstPage = {
  args: {
    currentPage: 1,
    totalPages: 24,
    pages: PAGES_NEAR_START,
    pageUrlPrefix: '?page=',
  },
  render: djangoComponent('pagination'),
};

export const LastPage = {
  args: {
    currentPage: 24,
    totalPages: 24,
    pages: PAGES_NEAR_END,
    pageUrlPrefix: '?page=',
  },
  render: djangoComponent('pagination'),
};
