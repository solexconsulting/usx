import React from 'react';
import classnames from 'classnames';
import { useTableContext } from './TableContext';
import TableRow from './TableRow';
import TableGroup from './TableGroup';
import type { RowKey, TableColumn, TableRowData } from './types';
import { leafColumns } from './columns';
import { mergeCellClasses, planCells } from './cells';
import type { PlannedCell } from './cells';
import Checkbox from '../checkbox/Checkbox';
import RadioButtons from '../radio-buttons/RadioButtons';
import Button from '../button/Button';

function getDataLabel(col: TableColumn): string | undefined {
  if (col.stackLabel) return col.stackLabel;
  return typeof col.header === 'string' ? col.header : undefined;
}

function DataRow({ row, rowIndex, plannedCells }: { row: TableRowData; rowIndex: number; plannedCells: PlannedCell[] }) {
  const {
    columns, id, primaryKey, selectionMode, selectionPosition, selectionVerticalAlign,
    selectedKeys, disabled, clickableRows, responsive, rowDetails, expandedRows,
  } = useTableContext();
  const key = row[primaryKey] as RowKey;
  const selected = selectedKeys.has(key);
  const isDisabled = disabled.includes(key);
  const visibleCols = leafColumns(columns);
  const hasRowDetails = !!rowDetails;
  const isExpanded = expandedRows.has(key);
  const renderDetail = typeof rowDetails === 'function' ? rowDetails : rowDetails?.render;
  const expandLabel = rowDetails && typeof rowDetails === 'object' ? rowDetails.expandLabel : undefined;
  const totalCols = visibleCols.length + Number(!!selectionMode) + Number(hasRowDetails);
  const selectionInputId = `${id}-select-${String(key)}`;
  const searchText = visibleCols.filter((col) => col.filterable !== false).map((col) =>
    String(col.searchValue ? col.searchValue(row) : row[col.key] ?? '')).join(' ');

  const selectionCell = <td key="__selection__" className={classnames(
    'usx-data-table__cell', 'usx-data-table__cell--selection', `usx-data-table__cell--valign-${selectionVerticalAlign}`)}>
    {selectionMode === 'radio'
      ? <RadioButtons name={`${id}-selection`} fieldset={false} small={true} formGroup={false}
        defaultValue={selected ? String(key) : undefined}
        options={[{ id: selectionInputId, value: String(key), label: '', ariaLabel: `Select row ${rowIndex + 1}`, disabled: isDisabled }]} />
      : <Checkbox id={selectionInputId} name={`${id}-selection`} value={String(key)}
        label="" ariaLabel={`Select row ${rowIndex + 1}`} small={true} formGroup={false}
        checked={selected} disabled={isDisabled} />}
  </td>;
  const detailToggleCell = hasRowDetails && <td key="__detail-toggle__" className="usx-data-table__cell usx-data-table__cell--detail-toggle">
    <Button variant="unstyled" className="usx-data-table__detail-toggle"
      aria-expanded={isExpanded} aria-controls={`${id}-row-detail-${key}`}
      data-detail-label={expandLabel ? 'custom' : undefined}
      aria-label={expandLabel ? typeof expandLabel === 'function' ? expandLabel(row) : expandLabel
        : `${isExpanded ? 'Collapse' : 'Expand'} row details`}
      iconProps={[{ name: 'expand_more', size: 2 }]} />
  </td>;
  const dataCells = plannedCells.map(({ column: col, options, colSpan, rowSpan }) => {
    const Tag = col.primary ? 'th' : 'td';
    const align = options.align ?? col.align;
    const verticalAlign = options.verticalAlign ?? col.verticalAlign;
    const content = col.render ? col.render(row, rowIndex) : row[col.key] as React.ReactNode;
    const raw = col.sortValue ? col.sortValue(row) : row[col.key];
    const sortValue = typeof raw === 'string' || typeof raw === 'number' ? String(raw) : undefined;
    return <Tag key={col.key}
      className={classnames('usx-data-table__cell', align && `usx-data-table__cell--align-${align}`,
        verticalAlign && `usx-data-table__cell--valign-${verticalAlign}`, mergeCellClasses(col.className, options.className))}
      scope={col.primary ? rowSpan > 1 ? 'rowgroup' : 'row' : undefined}
      data-label={responsive ? getDataLabel(col) : undefined}
      colSpan={colSpan > 1 ? colSpan : undefined} rowSpan={rowSpan > 1 ? rowSpan : undefined}
      data-column-key={col.key} data-sort-value={sortValue}
      style={{ width: col.width, backgroundColor: options.backgroundColor || col.backgroundColor,
        color: options.color || col.color }}>
      {align === 'center' ? <div className="usx-data-table__cell-content">{content ?? '--'}</div> : content ?? '--'}
    </Tag>;
  });
  const cells: React.ReactNode[] = [];
  if (detailToggleCell) cells.push(detailToggleCell);
  if (selectionMode && selectionPosition === 'left') cells.push(selectionCell);
  cells.push(...dataCells);
  if (selectionMode && selectionPosition === 'right') cells.push(selectionCell);

  return <>
    <TableRow rowKey={key} searchValue={searchText} selected={selected} disabled={isDisabled}
      clickable={clickableRows}
      className={row.rowProps?.className}
      style={{ '--usx-data-table-row-bg': row.rowProps?.backgroundColor, color: row.rowProps?.color } as React.CSSProperties}>
      {cells}
    </TableRow>
    {hasRowDetails && <tr id={`${id}-row-detail-${key}`} className="usx-data-table__detail-row" hidden={!isExpanded}>
      <td className="usx-data-table__detail-cell" colSpan={totalCols}>{renderDetail?.(row)}</td>
    </tr>}
  </>;
}

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

/** Complete initial rows; data-table.mjs filters, sorts, pages, and expands them. */
export default function TableBody({ className = '', children, ...props }: TableBodyProps) {
  const { columns, data, primaryKey, groupBy, groups, placeholder, totalCols, infinite, loading } = useTableContext();
  const bodyClass = classnames('usx-data-table__body', className);
  if (children) return <tbody className={bodyClass} {...props}>{children}</tbody>;

  const renderRows = (rows: TableRowData[]) =>
    planCells(rows, leafColumns(columns)).map(({ row, cells }, rowIndex) =>
      <DataRow key={(row[primaryKey] as RowKey) ?? rowIndex} row={row} rowIndex={rowIndex} plannedCells={cells} />);
  const placeholderRow = data.length === 0 && placeholder && <tr className="usx-data-table__placeholder-row">
    <td className="usx-data-table__placeholder-cell" colSpan={totalCols}>{placeholder}</td>
  </tr>;
  const loadingRow = loading && <tr className="usx-data-table__loading-row" aria-live="polite">
    <td className="usx-data-table__loading-cell" colSpan={totalCols}>Loading more rows…</td>
  </tr>;
  const sentinel = infinite && <tr className="usx-data-table__sentinel" aria-hidden="true"><td colSpan={totalCols} /></tr>;

  if (!groupBy) return <tbody className={bodyClass} {...props}>
    {placeholderRow}{renderRows(data)}{loadingRow}{sentinel}
  </tbody>;

  return <>
    {placeholderRow && <tbody className={bodyClass} {...props}>{placeholderRow}</tbody>}
    {(groups || []).map(({ key, rows }) => <TableGroup key={key} groupKey={key} label={key} rows={rows}>
      {renderRows(rows)}
    </TableGroup>)}
    {(loadingRow || sentinel) && <tbody className={bodyClass} {...props}>{loadingRow}{sentinel}</tbody>}
  </>;
}
