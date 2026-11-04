import React from 'react';
import classnames from 'classnames';
import { useTableContext } from './TableContext';
import type { TableColumn } from './types';
import { visibleColumns } from './columns';
import Checkbox from '../checkbox/Checkbox';

// ─── Multi-level header helpers ──────────────────────────────────────────────

function getDepth(columns: TableColumn[]): number {
  let max = 1;
  for (const col of columns) {
    if (col.columns?.length) max = Math.max(max, 1 + getDepth(col.columns));
  }
  return max;
}

function getLeafCount(col: TableColumn): number {
  if (!col.columns?.length) return 1;
  return col.columns.reduce((sum, c) => sum + getLeafCount(c), 0);
}

interface HeaderCell {
  col: TableColumn;
  rowSpan: number;
  colSpan: number;
}

// One array of cells per header level; leaf columns span down to the last level.
function buildHeaderRows(columns: TableColumn[], totalDepth: number): HeaderCell[][] {
  const rows: HeaderCell[][] = Array.from({ length: totalDepth }, () => []);
  function traverse(cols: TableColumn[], level: number) {
    for (const col of cols) {
      const isLeaf = !col.columns?.length;
      rows[level].push({ col, rowSpan: isLeaf ? totalDepth - level : 1, colSpan: isLeaf ? 1 : getLeafCount(col) });
      if (!isLeaf) traverse(col.columns!, level + 1);
    }
  }
  traverse(columns, 0);
  return rows;
}

export type TableHeadProps = React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * Renders `<thead>`. Compound mode: wrap your own `<tr>`/`<th>` children.
 * Data-driven mode: pass no children; renders from the table's columns.
 */
export default function TableHead({ className = '', children, ...props }: TableHeadProps) {
  const { id, columns, data, primaryKey, groupHeaders, sortState, selectionMode, selectionPosition, selectionVerticalAlign, selectedKeys, disabled, allowSelectAll, rowDetails } =
    useTableContext();

  if (children) {
    return (
      <thead className={classnames('usx-data-table__head', className)} {...props}>
        {children}
      </thead>
    );
  }

  const visibleCols = visibleColumns(columns);
  const totalDepth = getDepth(visibleCols);
  const headerRows = buildHeaderRows(visibleCols, totalDepth);
  const hasRowDetails = !!rowDetails;
  const hasSelection = !!selectionMode;
  const enabled = data.filter((row) => !disabled.includes(row[primaryKey] as string | number));
  const isAllSelected = enabled.length > 0 && enabled.every((row) => selectedKeys.has(row[primaryKey] as string | number));

  const selectAllCell = (
    <th scope="col" rowSpan={totalDepth + (groupHeaders.length ? 1 : 0)} className={classnames('usx-data-table__cell', 'usx-data-table__cell--selection', `usx-data-table__cell--valign-${selectionVerticalAlign}`)}>
      {selectionMode === 'checkbox' && allowSelectAll && (
        <Checkbox id={`${id}-select-all`} label="" ariaLabel="Select all rows" small={true} formGroup={false}
          checked={isAllSelected} />
      )}
    </th>
  );

  return (
    <thead className={classnames('usx-data-table__head', className)} {...props}>
      {!!groupHeaders.length && <tr className="usx-data-table__head-row usx-data-table__head-row--groups">
        {hasRowDetails && <th scope="col" rowSpan={totalDepth + 1} className="usx-data-table__cell usx-data-table__cell--detail-toggle" aria-label="Row details" />}
        {hasSelection && selectionPosition === 'left' && selectAllCell}
        {groupHeaders.map((column) => <th key={column.key} scope="col" colSpan={column.colSpan}
          className={classnames('usx-data-table__cell', column.align && `usx-data-table__cell--align-${column.align}`,
            column.verticalAlign && `usx-data-table__cell--valign-${column.verticalAlign}`, column.className)}
          style={{ backgroundColor: column.backgroundColor, color: column.color }}>{column.header}</th>)}
        {hasSelection && selectionPosition === 'right' && selectAllCell}
      </tr>}
      {headerRows.map((row, rowIndex) => (
        <tr key={rowIndex} className="usx-data-table__head-row">
          {hasRowDetails && rowIndex === 0 && !groupHeaders.length && (
            <th scope="col" rowSpan={totalDepth} className="usx-data-table__cell usx-data-table__cell--detail-toggle" aria-label="Row details" />
          )}
          {hasSelection && selectionPosition === 'left' && rowIndex === 0 && !groupHeaders.length && selectAllCell}

          {row.map(({ col, rowSpan, colSpan }) => {
            const isSortable = !col.columns?.length && col.sortable === true;
            const sortDir = sortState.key === col.key ? sortState.direction : null;
            const cellClasses = classnames(
              'usx-data-table__cell',
              col.headerAlign && `usx-data-table__cell--align-${col.headerAlign}`,
              !col.headerAlign && col.align && `usx-data-table__cell--align-${col.align}`,
              col.headerClassName
            );
            const ariaSort = !isSortable ? undefined : sortDir === 'asc' ? 'ascending' : sortDir === 'desc' ? 'descending' : undefined;
            return (
              <th
                key={col.key}
                scope="col"
                className={cellClasses}
                rowSpan={rowSpan > 1 ? rowSpan : undefined}
                colSpan={colSpan > 1 ? colSpan : undefined}
                style={{ width: col.width, backgroundColor: col.headerBackgroundColor, color: col.headerColor }}
                aria-sort={ariaSort}
                data-usx-sortable={isSortable || undefined}
                data-column-key={col.key}
              >
                {col.header}
              </th>
            );
          })}

          {hasSelection && selectionPosition === 'right' && rowIndex === 0 && !groupHeaders.length && selectAllCell}
        </tr>
      ))}
    </thead>
  );
}
