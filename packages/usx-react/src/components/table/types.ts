import type { ReactNode } from 'react';

export type TableRowData = Record<string, unknown>;
export type RowKey = string | number;
export type Align = 'left' | 'center' | 'right';
export type SortDirection = 'asc' | 'desc' | null;
export type SelectionMode = 'checkbox' | 'radio' | null;
export type Responsive = false | 'stack' | 'stack-header';
export type Aggregate = 'sum' | 'avg' | 'min' | 'max' | 'count';

export interface SortState {
  key: string | null;
  direction: SortDirection;
}

export interface TableColumn {
  key: string;
  header?: ReactNode;
  /** Nested columns produce a multi-level header; only leaf columns render body cells. */
  columns?: TableColumn[];
  render?: (row: TableRowData, rowIndex: number) => ReactNode;
  footer?: ReactNode | ((data: TableRowData[]) => ReactNode);
  align?: Align;
  headerAlign?: Align;
  sortable?: boolean;
  sortFn?: (a: TableRowData, b: TableRowData, direction: SortDirection) => number;
  width?: string | number;
  minWidth?: string;
  /** Render body cells as row-header `<th scope="row">`. */
  primary?: boolean;
  hidden?: boolean;
  className?: string;
  headerClassName?: string;
  aggregate?: Aggregate;
  /** data-label for stacked/responsive layouts when `header` isn't a plain string. */
  stackLabel?: string;
}

export interface GroupByConfig {
  property: string;
  expand?: RowKey[];
  onExpand?: (expanded: RowKey[]) => void;
  defaultExpanded?: boolean;
}
export type GroupBy = string | GroupByConfig | null | undefined;

export interface RowDetailsConfig {
  render?: (row: TableRowData) => ReactNode;
  expand?: RowKey[];
  onExpand?: (expanded: RowKey[]) => void;
  expandLabel?: string | ((row: TableRowData) => string);
}
export type RowDetails = ((row: TableRowData) => ReactNode) | RowDetailsConfig | null | undefined;

export interface PaginateConfig {
  pageSize?: number;
  pageSizeOptions?: number[];
  /** Total item count — enables server-side mode. */
  totalCount?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  showStepOptions?: boolean;
  showSummary?: boolean;
}

export interface TableGroupEntry {
  key: string;
  rows: TableRowData[];
}
