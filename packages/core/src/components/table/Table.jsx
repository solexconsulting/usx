import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './table.scss';
import Pagination from '../pagination/Pagination';

import { TableContext } from './TableContext';
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

// ─── Leaf-column count helper ─────────────────────────────────────────────────

function countLeafCols(columns) {
  return columns.reduce((sum, col) => {
    if (col.hidden) return sum;
    if (col.columns?.length) return sum + countLeafCols(col.columns);
    return sum + 1;
  }, 0);
}

function Caption({ children, className = '', ...rest }) {
  return (
    <caption className={classnames('usx-table__caption', className)} {...rest}>
      {children}
    </caption>
  );
}
Caption.propTypes = { children: PropTypes.node, className: PropTypes.string };

// ─── Main Table component ─────────────────────────────────────────────────────

/**
 * Table — USX design system table component.
 *
 * Primary API: data-driven via `columns` + `data`.
 * Escape hatch: compound component mode via Table.Head / Table.Body / etc.
 */
export default function Table({
  // Data
  columns = [],
  data = [],
  primaryKey = 'id',

  // USWDS variants
  striped = false,
  borderless = false,
  compact = false,

  // Layout / Responsive
  scrollable = false,
  height,
  responsive = false,
  stickyHeader = false,
  stickyFirstColumn = false,
  caption,

  // Sorting
  sortable: sortableAll = false,
  sort: sortProp,
  onSort,

  // Selection
  selectionMode = null,
  selectionPosition = 'left',
  select: selectProp,
  onSelect,
  allowSelectAll = true,
  disabled = [],

  // Row interaction
  onClickRow,

  // Groups
  groupBy,

  // Row details
  rowDetails,

  // Footer
  showFooter = false,

  // Pagination
  paginate,
  onMore,

  // Loading state (e.g. while fetching the next page of infinite-scroll data)
  loading = false,

  // Empty state
  placeholder,

  // HTML passthrough
  className = '',
  children,
  ...props
}) {
  // Apply sortable=true globally to columns that don't explicitly opt out
  const resolvedColumns = useMemo(() => {
    if (!sortableAll) return columns;
    return columns.map((col) => ({
      ...col,
      sortable: col.sortable !== false,
    }));
  }, [columns, sortableAll]);

  const { sortState, handleSort, sortedData } = useTableSort({
    sortProp,
    onSort,
    columns: resolvedColumns,
    data,
  });

  // ── Pagination state ────────────────────────────────────────────────────────
  const isPaginated = !!paginate;
  const paginateConfig = paginate === true ? {} : (paginate || {});
  const defaultPageSize = paginateConfig.pageSize || 10;
  const isServerSide = !!(paginateConfig.totalCount);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Reset to page 1 whenever sort changes so the user isn't stranded mid-table.
  useEffect(() => {
    if (isPaginated) setCurrentPage(1);
  }, [sortState.key, sortState.direction]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalItems = isServerSide ? paginateConfig.totalCount : sortedData.length;

  const activeData = isPaginated && !isServerSide
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const {
    selectedKeys,
    handleSelect,
    handleSelectAll,
    isSelected,
    isAllSelected,
    isIndeterminate,
  } = useTableSelect({
    selectionMode,
    selectProp,
    onSelect,
    data: activeData,
    primaryKey,
    disabled,
    allowSelectAll,
  });

  const { groups, expandedGroups, toggleGroup, isGroupExpanded } =
    useTableGroups({ groupBy, data: activeData });

  const { expandedRows, toggleRow, isRowExpanded } = useRowDetails({
    rowDetails,
    primaryKey,
  });

  const totalCols = useMemo(() => {
    const dataCols = countLeafCols(resolvedColumns);
    return dataCols + (selectionMode ? 1 : 0) + (rowDetails ? 1 : 0);
  }, [resolvedColumns, selectionMode, rowDetails]);

  const contextValue = useMemo(() => ({
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
  }), [
    resolvedColumns, activeData, primaryKey,
    sortState, handleSort,
    selectionMode, selectionPosition, selectedKeys, handleSelect, handleSelectAll,
    isSelected, isAllSelected, isIndeterminate, allowSelectAll, disabled,
    onClickRow,
    groupBy, groups, expandedGroups, toggleGroup, isGroupExpanded,
    expandedRows, toggleRow, isRowExpanded, rowDetails,
    responsive, stickyFirstColumn, totalCols,
    placeholder, onMore, loading,
  ]);

  const tableClasses = classnames(
    'usa-table',
    striped && 'usa-table--striped',
    borderless && 'usa-table--borderless',
    compact && 'usa-table--compact',
    stickyHeader && 'usa-table--sticky-header',
    responsive === 'stack' && 'usa-table--stacked',
    responsive === 'stack-header' && 'usa-table--stacked-header',
    'usx-table',
    striped && 'usx-table--striped',
    borderless && 'usx-table--borderless',
    compact && 'usx-table--compact',
    stickyHeader && 'usx-table--sticky-header',
    stickyFirstColumn && 'usx-table--sticky-first-col',
    className,
  );

  const wrapperStyle = height ? { maxHeight: height, overflow: 'auto' } : undefined;
  const needsScrollWrapper = scrollable || !!height;

  const tableEl = (
    <table
      className={tableClasses}
      {...props}
    >
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

  const wrapped = needsScrollWrapper ? (
    <div
      className="usa-table-container--scrollable usx-table-container--scrollable"
      tabIndex={0}
      style={wrapperStyle}
    >
      {tableEl}
    </div>
  ) : tableEl;

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
            if (isServerSide && paginateConfig.onPageChange) {
              paginateConfig.onPageChange(page, pageSize);
            }
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

Table.Head = TableHead;
Table.Body = TableBody;
Table.Foot = TableFoot;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Group = TableGroup;
Table.Caption = Caption;

// ── PropTypes ─────────────────────────────────────────────────────────────────

const ColumnDefShape = PropTypes.shape({
  key: PropTypes.string.isRequired,
  header: PropTypes.node,
  render: PropTypes.func,
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  headerAlign: PropTypes.oneOf(['left', 'center', 'right']),
  sortable: PropTypes.bool,
  sortFn: PropTypes.func,
  width: PropTypes.string,
  minWidth: PropTypes.string,
  pin: PropTypes.bool,
  primary: PropTypes.bool,
  hidden: PropTypes.bool,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  aggregate: PropTypes.oneOf(['sum', 'avg', 'min', 'max', 'count']),
  stackLabel: PropTypes.string,
});

Table.propTypes = {
  columns: PropTypes.arrayOf(ColumnDefShape),
  data: PropTypes.arrayOf(PropTypes.object),
  primaryKey: PropTypes.string,

  striped: PropTypes.bool,
  borderless: PropTypes.bool,
  compact: PropTypes.bool,

  scrollable: PropTypes.bool,
  height: PropTypes.string,
  responsive: PropTypes.oneOf([false, 'stack', 'stack-header']),
  stickyHeader: PropTypes.bool,
  stickyFirstColumn: PropTypes.bool,
  caption: PropTypes.node,

  sortable: PropTypes.bool,
  sort: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc', null]),
  }),
  onSort: PropTypes.func,

  selectionMode: PropTypes.oneOf([null, 'checkbox', 'radio']),
  selectionPosition: PropTypes.oneOf(['left', 'right']),
  select: PropTypes.array,
  onSelect: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  disabled: PropTypes.array,

  onClickRow: PropTypes.func,

  groupBy: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      property: PropTypes.string,
      expand: PropTypes.array,
      onExpand: PropTypes.func,
      defaultExpanded: PropTypes.bool,
    }),
  ]),

  rowDetails: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      render: PropTypes.func,
      expand: PropTypes.array,
      onExpand: PropTypes.func,
      expandLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    }),
  ]),

  showFooter: PropTypes.bool,

  paginate: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      /** Number of rows per page (default 20) */
      pageSize: PropTypes.number,
      /** Available page size choices shown in step-options (default [10, 25, 50, 100]) */
      pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
      /** Total item count for server-side pagination and the summary display */
      totalCount: PropTypes.number,
      /** Called with (page, pageSize) when the page changes (server-side mode) */
      onPageChange: PropTypes.func,
      /** Show/hide the page-size step-options control */
      showStepOptions: PropTypes.bool,
      /** Show/hide the items summary */
      showSummary: PropTypes.bool,
    }),
  ]),
  onMore: PropTypes.func,
  loading: PropTypes.bool,

  placeholder: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
};