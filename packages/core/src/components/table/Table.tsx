import React, { useMemo, useState, useEffect, useId } from 'react';
import classnames from 'classnames';
import Pagination from '../pagination/Pagination';

import { TableContext } from './TableContext';
import type { TableContextValue } from './TableContext';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableFoot from './TableFoot';
import TableRow from './TableRow';
import TableCell from './TableCell';
import TableGroup from './TableGroup';

import { useTableSort } from './hooks/useTableSort';
import { useTableSelect } from './hooks/useTableSelect';
import { useTableGroups } from './hooks/useTableGroups';
import { useRowDetails } from './hooks/useRowDetails';

import type {
  GroupBy,
  PaginateConfig,
  Responsive,
  RowDetails,
  RowKey,
  SelectionMode,
  SortState,
  TableColumn,
  TableRowData,
} from './types';

export type {
  Align,
  Aggregate,
  GroupBy,
  GroupByConfig,
  PaginateConfig,
  Responsive,
  RowDetails,
  RowDetailsConfig,
  RowKey,
  SelectionMode,
  SortDirection,
  SortState,
  TableColumn,
  TableRowData,
} from './types';

function countLeafCols(columns: TableColumn[]): number {
  return columns.reduce((sum, col) => {
    if (col.hidden) return sum;
    if (col.columns?.length) return sum + countLeafCols(col.columns);
    return sum + 1;
  }, 0);
}

function Caption({ className = '', children, ...rest }: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption className={classnames('usx-table__caption', className)} {...rest}>
      {children}
    </caption>
  );
}

// `placeholder`/`onSelect` exist on HTMLAttributes with DOM types; the table API redefines them.
export interface TableProps extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'children' | 'placeholder' | 'onSelect'> {
  // Data
  columns?: TableColumn[];
  data?: TableRowData[];
  /** Row field used as the unique key (default `id`). */
  primaryKey?: string;

  // USWDS variants
  striped?: boolean;
  borderless?: boolean;
  compact?: boolean;

  // Layout / responsive
  scrollable?: boolean;
  /** Max height (CSS value); implies a scroll wrapper. */
  height?: string;
  responsive?: Responsive;
  stickyHeader?: boolean;
  stickyFirstColumn?: boolean;
  caption?: React.ReactNode;

  // Sorting
  /** Make every column sortable unless it sets `sortable: false`. */
  sortable?: boolean;
  /** Controlled sort state. */
  sort?: SortState | null;
  onSort?: (next: SortState) => void;

  // Selection
  selectionMode?: SelectionMode;
  selectionPosition?: 'left' | 'right';
  /** Controlled selected keys. */
  select?: RowKey[] | null;
  onSelect?: (selected: RowKey[]) => void;
  allowSelectAll?: boolean;
  /** Keys of rows that cannot be selected. */
  disabled?: RowKey[];

  // Row interaction
  onClickRow?: TableContextValue['onClickRow'];

  // Groups / details
  groupBy?: GroupBy;
  rowDetails?: RowDetails;

  showFooter?: boolean;

  // Pagination
  paginate?: boolean | PaginateConfig;
  /** Infinite scroll: called when the sentinel row scrolls into view. */
  onMore?: (() => void) | null;
  /** Show a loading row (e.g. while fetching the next page). */
  loading?: boolean;

  /** Content of the single row shown when `data` is empty. */
  placeholder?: React.ReactNode;
  /** Compound mode: render your own Table.Head / Table.Body / … */
  children?: React.ReactNode;
}

/**
 * Table — USX design system table.
 * Primary API: data-driven via `columns` + `data`.
 * Escape hatch: compound mode via Table.Head / Table.Body / Table.Row / Table.Cell.
 */
function Table({
  id: idProp,
  columns = [],
  data = [],
  primaryKey = 'id',
  striped = false,
  borderless = false,
  compact = false,
  scrollable = false,
  height,
  responsive = false,
  stickyHeader = false,
  stickyFirstColumn = false,
  caption,
  sortable: sortableAll = false,
  sort: sortProp,
  onSort,
  selectionMode = null,
  selectionPosition = 'left',
  select: selectProp,
  onSelect,
  allowSelectAll = true,
  disabled = [],
  onClickRow = null,
  groupBy,
  rowDetails,
  showFooter = false,
  paginate,
  onMore = null,
  loading = false,
  placeholder,
  className = '',
  children,
  ...props
}: TableProps) {
  const generatedId = useId();
  const id = idProp ?? `usx-table-${generatedId}`;

  const resolvedColumns = useMemo(() => {
    if (!sortableAll) return columns;
    return columns.map((col) => ({ ...col, sortable: col.sortable !== false }));
  }, [columns, sortableAll]);

  const { sortState, handleSort, sortedData } = useTableSort({ sortProp, onSort, columns: resolvedColumns, data });

  // ── Pagination ──────────────────────────────────────────────────────────────
  const isPaginated = !!paginate;
  const paginateConfig: PaginateConfig = paginate === true ? {} : paginate || {};
  const defaultPageSize = paginateConfig.pageSize || 10;
  const isServerSide = !!paginateConfig.totalCount;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Back to page 1 whenever sort changes so the user isn't stranded mid-table.
  useEffect(() => {
    if (isPaginated) setCurrentPage(1);
  }, [isPaginated, sortState.key, sortState.direction]);

  const totalItems = isServerSide ? paginateConfig.totalCount! : sortedData.length;
  const activeData =
    isPaginated && !isServerSide ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize) : sortedData;

  const { selectedKeys, handleSelect, handleSelectAll, isSelected, isAllSelected, isIndeterminate } = useTableSelect({
    selectionMode,
    selectProp,
    onSelect,
    data: activeData,
    primaryKey,
    disabled,
    allowSelectAll,
  });

  const { groups, expandedGroups, toggleGroup, isGroupExpanded } = useTableGroups({ groupBy, data: activeData });
  const { expandedRows, toggleRow, isRowExpanded } = useRowDetails({ rowDetails });

  const totalCols = useMemo(
    () => countLeafCols(resolvedColumns) + (selectionMode ? 1 : 0) + (rowDetails ? 1 : 0),
    [resolvedColumns, selectionMode, rowDetails]
  );

  const contextValue = useMemo<TableContextValue>(
    () => ({
      id,
      columns: resolvedColumns,
      data: activeData,
      primaryKey,
      sortState,
      handleSort,
      selectionMode,
      selectionPosition,
      selectedKeys,
      handleSelect,
      handleSelectAll,
      isSelected,
      isAllSelected,
      isIndeterminate,
      allowSelectAll,
      disabled,
      onClickRow,
      groupBy,
      groups,
      expandedGroups,
      toggleGroup,
      isGroupExpanded,
      expandedRows,
      toggleRow,
      isRowExpanded,
      rowDetails,
      responsive,
      stickyFirstColumn,
      totalCols,
      placeholder,
      onMore,
      loading,
    }),
    [
      id, resolvedColumns, activeData, primaryKey,
      sortState, handleSort,
      selectionMode, selectionPosition, selectedKeys, handleSelect, handleSelectAll,
      isSelected, isAllSelected, isIndeterminate, allowSelectAll, disabled,
      onClickRow,
      groupBy, groups, expandedGroups, toggleGroup, isGroupExpanded,
      expandedRows, toggleRow, isRowExpanded, rowDetails,
      responsive, stickyFirstColumn, totalCols,
      placeholder, onMore, loading,
    ]
  );

  const tableClasses = classnames(
    'usa-table',
    striped && 'usa-table--striped',
    borderless && 'usa-table--borderless',
    compact && 'usa-table--compact',
    stickyHeader && 'usa-table--sticky-header',
    responsive === 'stack' && 'usa-table--stacked',
    responsive === 'stack-header' && 'usa-table--stacked-header',
    'usx-table',
    stickyFirstColumn && 'usx-table--sticky-first-col',
    className
  );

  const tableEl = (
    <table id={idProp} className={tableClasses} {...props}>
      {caption && <Caption>{caption}</Caption>}
      {children || (
        <>
          <TableHead />
          <TableBody />
          {showFooter && <TableFoot />}
        </>
      )}
    </table>
  );

  const needsScrollWrapper = scrollable || !!height;
  const wrapped = needsScrollWrapper ? (
    <div
      className="usa-table-container--scrollable usx-table-container--scrollable"
      tabIndex={0}
      style={height ? { maxHeight: height, overflow: 'auto' } : undefined}
    >
      {tableEl}
    </div>
  ) : (
    tableEl
  );

  return (
    <TableContext.Provider value={contextValue}>
      {wrapped}
      {isPaginated && (
        <Pagination
          key={`${sortState.key}-${sortState.direction}`}
          initialPage={1}
          initialPageSize={pageSize}
          totalItems={totalItems}
          onPageChange={(page) => {
            setCurrentPage(page);
            if (isServerSide) paginateConfig.onPageChange?.(page, pageSize);
          }}
          onPageSizeChange={(size, page) => {
            setPageSize(size);
            setCurrentPage(page);
          }}
          {...(paginateConfig.pageSizeOptions ? { pageSizeOptions: paginateConfig.pageSizeOptions } : {})}
          {...(paginateConfig.showStepOptions !== undefined ? { showStepOptions: paginateConfig.showStepOptions } : {})}
          {...(paginateConfig.showSummary !== undefined ? { showSummary: paginateConfig.showSummary } : {})}
        />
      )}
    </TableContext.Provider>
  );
}

// ── Compound sub-components ───────────────────────────────────────────────────

export default Object.assign(Table, {
  Head: TableHead,
  Body: TableBody,
  Foot: TableFoot,
  Row: TableRow,
  Cell: TableCell,
  Group: TableGroup,
  Caption,
});
