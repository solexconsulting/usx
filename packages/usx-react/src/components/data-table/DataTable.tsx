import React, { useId } from 'react';
import classnames from 'classnames';
import { TableContext } from './TableContext';
import type { TableContextValue } from './TableContext';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableFoot from './TableFoot';
import TableRow from './TableRow';
import TableCell from './TableCell';
import TableGroup from './TableGroup';
import { leafColumns } from './columns';
import Input from '../input/Input';
import Pagination from '../pagination/Pagination';
import type {
  GroupBy, PaginateConfig, Responsive, RowDetails, RowKey, SelectionMode,
  SortState, TableColumn, TableRowData, VerticalAlign,
} from './types';

export type {
  Align, Aggregate, CellOptions, GroupBy, GroupColumn, GroupByConfig,
  PaginateConfig, Responsive, RowOptions, RowDetails, RowDetailsConfig,
  RowKey, SelectionMode, SortDirection, SortState, TableColumn, TableRowData,
  VerticalAlign,
} from './types';

function Caption({ className = '', children, ...rest }: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return <caption className={classnames('usx-data-table__caption', className)} {...rest}>{children}</caption>;
}

// DataTable renders the complete initial DOM. @solexllc/usx/js/data-table owns every interaction.
export interface TableProps extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'children' | 'placeholder' | 'onSelect'> {
  columns?: TableColumn[];
  data?: TableRowData[];
  primaryKey?: string;
  striped?: boolean;
  borderless?: boolean;
  compact?: boolean;
  scrollable?: boolean;
  height?: string;
  responsive?: Responsive;
  stickyHeader?: boolean;
  stickyFirstColumn?: boolean;
  caption?: React.ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  sortable?: boolean;
  /** Initial sort state. Subsequent changes are emitted as usx:data-table:sort events. */
  sort?: SortState | null;
  selectionMode?: SelectionMode;
  selectionPosition?: 'left' | 'right';
  selectionVerticalAlign?: VerticalAlign;
  /** Initially selected keys. */
  select?: RowKey[] | null;
  allowSelectAll?: boolean;
  disabled?: RowKey[];
  /** Emit usx:data-table:row-activate for clicks and Enter/Space on rows. */
  clickableRows?: boolean;
  groupBy?: GroupBy;
  rowDetails?: RowDetails;
  showFooter?: boolean;
  paginate?: boolean | PaginateConfig;
  /** Emit usx:data-table:more when the sentinel enters the viewport. */
  infinite?: boolean;
  loading?: boolean;
  placeholder?: React.ReactNode;
  children?: React.ReactNode;
}

/** Data-driven table with a compound markup escape hatch. */
function DataTable({
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
  searchable = false,
  searchPlaceholder = 'Search table',
  sortable: sortableAll = false,
  sort: initialSort,
  selectionMode = null,
  selectionPosition = 'left',
  selectionVerticalAlign = 'middle',
  select: initialSelection,
  allowSelectAll = true,
  disabled = [],
  clickableRows = false,
  groupBy,
  rowDetails,
  showFooter = false,
  paginate,
  infinite = false,
  loading = false,
  placeholder = 'No rows to display',
  className = '',
  children,
  ...props
}: TableProps) {
  const generatedId = useId();
  const id = idProp ?? `usx-data-table-${generatedId}`;
  const resolveColumns = (items: TableColumn[]): TableColumn[] => items.map((column) => ({
    ...column,
    ...(column.columns?.length
      ? { columns: resolveColumns(column.columns) }
      : sortableAll ? { sortable: column.sortable !== false } : {}),
  }));
  const resolvedColumns = sortableAll ? resolveColumns(columns) : columns;
  const groupConfig = typeof groupBy === 'object' && groupBy !== null ? groupBy : null;
  const groupKey = typeof groupBy === 'string' ? groupBy : groupConfig?.property;
  const groups = groupKey ? [...data.reduce((map, row) => {
    const key = String(row[groupKey] ?? '__ungrouped__');
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(row);
    return map;
  }, new Map<string, TableRowData[]>())].map(([key, rows]) => ({ key, rows })) : null;
  const expandedGroups = new Set<string>(groupConfig?.expand
    ? groupConfig.expand.map(String)
    : groupConfig?.defaultExpanded === false ? [] : groups?.map(({ key }) => key) || []);
  const detailConfig = rowDetails && typeof rowDetails === 'object' ? rowDetails : null;
  const pageConfig: PaginateConfig = paginate === true ? {} : paginate || {};
  const pageSize = pageConfig.pageSize || 10;
  const totalCols = leafColumns(resolvedColumns).length + Number(!!selectionMode) + Number(!!rowDetails);
  const contextValue: TableContextValue = {
    id, columns: resolvedColumns, data, primaryKey,
    sortState: initialSort || { key: null, direction: null },
    selectionMode, selectionPosition, selectionVerticalAlign,
    selectedKeys: new Set(initialSelection || []), allowSelectAll, disabled, clickableRows,
    groupBy, groupColumns: groupConfig?.columns || [],
    groupHeaders: groupConfig?.headers || groupConfig?.columns || [],
    groupValues: groupConfig?.values || {},
    groups, expandedGroups, expandedRows: new Set(detailConfig?.expand || []),
    rowDetails, responsive, totalCols, placeholder, infinite, loading,
  };
  const tableClasses = classnames(
    'usa-table', 'usx-data-table',
    striped && 'usx-data-table--striped', borderless && 'usx-data-table--borderless',
    compact && 'usx-data-table--compact', stickyHeader && 'usx-data-table--sticky-header',
    responsive === 'stack' && 'usx-data-table--stacked',
    responsive === 'stack-header' && 'usx-data-table--stacked-header',
    stickyFirstColumn && 'usx-data-table--sticky-first-col', className,
  );
  const table = <table id={id} className={tableClasses} {...props}>
    {caption && <Caption>{caption}</Caption>}
    {children || <><TableHead /><TableBody />{showFooter && <TableFoot />}</>}
  </table>;

  return <TableContext.Provider value={contextValue}>
    <div className="usx-data-table-shell" data-usx-data-table
      data-searchable={searchable || undefined} data-paginate={!!paginate || undefined}
      data-page-size={paginate ? pageSize : undefined}
      data-total-count={pageConfig.totalCount} data-infinite={infinite || undefined}>
      {searchable && <div className="usx-data-table__toolbar">
        <Input id={`${id}-search`} label="Search" formGroup={false} placeholder={searchPlaceholder} />
      </div>}
      {scrollable || height ? <div className="usx-data-table-container--scrollable" tabIndex={0}
        style={height ? { maxHeight: height, overflow: 'auto' } : undefined}>{table}</div> : table}
      {!!paginate && <Pagination className="usx-data-table__pagination" currentPage={1} pageSize={pageSize}
        totalItems={pageConfig.totalCount ?? data.length}
        pageSizeOptions={pageConfig.pageSizeOptions ?? [pageSize, 10, 25, 50].filter((value, index, list) => list.indexOf(value) === index)}
        showStepOptions={pageConfig.showStepOptions !== false} showSummary={pageConfig.showSummary !== false}
        stepOptionsId={`${id}-page-size`} ariaLabel={`${typeof caption === 'string' ? caption : 'Data table'} pages`} />}
    </div>
  </TableContext.Provider>;
}

export default Object.assign(DataTable, {
  Head: TableHead, Body: TableBody, Foot: TableFoot,
  Row: TableRow, Cell: TableCell, Group: TableGroup, Caption,
});
