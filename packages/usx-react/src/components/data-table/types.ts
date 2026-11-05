import type { ReactNode } from 'react';

export type RowKey = string | number;
export type Align = 'left' | 'center' | 'right';
export type VerticalAlign = 'top' | 'middle' | 'bottom';
export type SortDirection = 'asc' | 'desc' | null;
export type SelectionMode = 'checkbox' | 'radio' | null;
export type Responsive = false | 'stack' | 'stack-header';
export type Aggregate = 'sum' | 'avg' | 'min' | 'max' | 'count';

export interface CellOptions {
  colSpan?: number;
  rowSpan?: number;
  align?: Align;
  verticalAlign?: VerticalAlign;
  backgroundColor?: string;
  color?: string;
  className?: string;
}

export interface RowOptions {
  backgroundColor?: string;
  color?: string;
  className?: string;
}

export interface TableRowData extends Record<string, unknown> {
  rowProps?: RowOptions;
  cellProps?: Record<string, CellOptions>;
}

export interface GroupColumn extends Omit<CellOptions, 'rowSpan'> {
  key: string;
  header: ReactNode;
  /** The first group column displays the group key unless a value is supplied. */
  render?: (group: TableGroupEntry) => ReactNode;
}

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
  verticalAlign?: VerticalAlign;
  headerAlign?: Align;
  sortable?: boolean;
  width?: string | number;
  minWidth?: string;
  /** Render body cells as row-header `<th scope="row">`. */
  primary?: boolean;
  hidden?: boolean;
  /** Exclude this column from client-side search. */
  filterable?: boolean;
  /** Text used by client-side search when the displayed value is computed. */
  searchValue?: (row: TableRowData) => unknown;
  /** Comparable value serialized into each cell for the shared JS sorter. */
  sortValue?: (row: TableRowData) => string | number;
  className?: string;
  headerClassName?: string;
  backgroundColor?: string;
  color?: string;
  headerBackgroundColor?: string;
  headerColor?: string;
  aggregate?: Aggregate;
  /** data-label for stacked/responsive layouts when `header` isn't a plain string. */
  stackLabel?: string;
}

export interface GroupByConfig {
  property: string;
  /** Header band above the regular column headers. Defaults to columns for compatibility. */
  headers?: GroupColumn[];
  /** Cells displayed within each grouped row. */
  columns?: GroupColumn[];
  /** Classes applied to every grouped row, including bg-* and text-* utilities. */
  rowClassName?: string;
  /** Additional values for each group row, keyed by group key then column key. */
  values?: Record<string, Record<string, unknown>>;
  expand?: RowKey[];
  defaultExpanded?: boolean;
}
export type GroupBy = string | GroupByConfig | null | undefined;

export interface RowDetailsConfig {
  render?: (row: TableRowData) => ReactNode;
  expand?: RowKey[];
  expandLabel?: string | ((row: TableRowData) => string);
}
export type RowDetails = ((row: TableRowData) => ReactNode) | RowDetailsConfig | null | undefined;

export interface PaginateConfig {
  pageSize?: number;
  pageSizeOptions?: number[];
  /** Total item count — enables server-side mode. */
  totalCount?: number;
  showStepOptions?: boolean;
  showSummary?: boolean;
}

export interface TableGroupEntry {
  key: string;
  rows: TableRowData[];
}
