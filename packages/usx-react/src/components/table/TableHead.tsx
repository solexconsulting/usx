import React from 'react';
import classnames from 'classnames';
import { useTableContext } from './TableContext';
import Icon from '../icon/Icon';
import Checkbox from '../checkbox/Checkbox';
import type { SortDirection, TableColumn } from './types';

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

function SortIcon({ direction }: { direction: SortDirection }) {
  const name = direction === 'asc' ? 'arrow_upward' : direction === 'desc' ? 'arrow_downward' : 'sort_arrow';
  return <Icon name={name} aria-hidden="true" />;
}

export type TableHeadProps = React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * Renders `<thead>`. Compound mode: wrap your own `<tr>`/`<th>` children.
 * Data-driven mode: pass no children; renders from the table's columns.
 */
export default function TableHead({ className = '', children, ...props }: TableHeadProps) {
  const { id, columns, sortState, handleSort, selectionMode, selectionPosition, handleSelectAll, allowSelectAll, rowDetails } =
    useTableContext();

  if (children) {
    return (
      <thead className={classnames('usx-table__head', className)} {...props}>
        {children}
      </thead>
    );
  }

  const visibleCols = columns.filter((c) => !c.hidden);
  const totalDepth = getDepth(visibleCols);
  const headerRows = buildHeaderRows(visibleCols, totalDepth);
  const hasRowDetails = !!rowDetails;
  const hasSelection = !!selectionMode;

  const selectAllCell = (
    <th scope="col" rowSpan={totalDepth} className="usx-table__cell usx-table__cell--selection">
      {selectionMode === 'checkbox' && allowSelectAll && (
        <Checkbox id={`${id}-select-all`} onChange={handleSelectAll} ariaLabel="Select all rows" className="usx-table__checkbox" />
      )}
    </th>
  );

  return (
    <thead className={classnames('usx-table__head', className)} {...props}>
      {/* Sort announcement region for screen readers */}
      <tr hidden aria-hidden="true">
        <td>
          <span className="usa-sr-only usa-table__announcement-region" aria-live="polite" id={`${id}-sort-announcement`} />
        </td>
      </tr>

      {headerRows.map((row, rowIndex) => (
        <tr key={rowIndex} className="usx-table__head-row">
          {hasRowDetails && rowIndex === 0 && (
            <th scope="col" rowSpan={totalDepth} className="usx-table__cell usx-table__cell--detail-toggle" aria-label="Row details" />
          )}
          {hasSelection && selectionPosition === 'left' && rowIndex === 0 && selectAllCell}

          {row.map(({ col, rowSpan, colSpan }) => {
            const isSortable = col.sortable === true;
            const sortDir = sortState.key === col.key ? sortState.direction : null;
            const cellClasses = classnames(
              'usx-table__cell',
              col.headerAlign && `usx-table__cell--align-${col.headerAlign}`,
              !col.headerAlign && col.align && `usx-table__cell--align-${col.align}`,
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
                style={col.width ? { width: col.width } : undefined}
                aria-sort={ariaSort}
                data-sortable={isSortable || undefined}
              >
                {isSortable ? (
                  <button
                    type="button"
                    className={classnames('usx-table__sort-button', sortDir && 'usx-table__sort-button--active')}
                    onClick={() => handleSort(col.key)}
                  >
                    {col.header}
                    <SortIcon direction={sortDir} />
                  </button>
                ) : (
                  col.header
                )}
              </th>
            );
          })}

          {hasSelection && selectionPosition === 'right' && rowIndex === 0 && selectAllCell}
        </tr>
      ))}
    </thead>
  );
}
