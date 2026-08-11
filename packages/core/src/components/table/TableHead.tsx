import React from 'react';
import classnames from 'classnames';
import { useTableContext } from './TableContext';
import Icon from '../icon/Icon';
import Checkbox from '../checkbox/Checkbox';

import type { TableColumn } from './types';

function getDepth(columns: TableColumn[]): number {
  let max = 1;
  columns.forEach((col) => {
    if (col.columns?.length) {
      const d = 1 + getDepth(col.columns);
      if (d > max) max = d;
    }
  });
  return max;
}

function getLeafCount(col: TableColumn): number {
  if (!col.columns?.length) return 1;
  return col.columns.reduce((sum: number, c: TableColumn) => sum + getLeafCount(c), 0);
}

type HeaderCell = { col: TableColumn; rowSpan: number; colSpan: number };
function buildHeaderRows(columns: TableColumn[], totalDepth: number) {
  const rows: HeaderCell[][] = Array.from({ length: totalDepth }, () => []);
  function traverse(cols: TableColumn[], level: number) {
    cols.forEach((col) => {
      const isLeaf = !col.columns?.length;
      const rowSpan = isLeaf ? totalDepth - level : 1;
      const colSpan = isLeaf ? 1 : getLeafCount(col);
      rows[level].push({ col, rowSpan, colSpan });
      if (!isLeaf) {
        traverse(col.columns, level + 1);
      }
    });
  }
  traverse(columns, 0);
  return rows;
}

function SortIcon({ direction }: { direction: 'asc' | 'desc' | null }) {
  return (
    <Icon
      name={
        direction === 'asc' ? 'arrow_upward' :
        direction === 'desc' ? 'arrow_downward' :
        'sort_arrow'
      }
      aria-hidden="true"
    />
  );
}

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  children?: React.ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ className = '', children, ...props }) => {
  const {
    id,
    columns,
    sortState,
    handleSort,
    selectionMode,
    selectionPosition,
    isAllSelected,
    isIndeterminate,
    handleSelectAll,
    allowSelectAll,
    rowDetails,
  } = useTableContext();

  if (children) {
    return (
      <thead className={classnames('usx-table__head', className)} {...props}>
        {children}
      </thead>
    );
  }

  const visibleCols = columns.filter((c: TableColumn) => !c.hidden);
  const totalDepth = getDepth(visibleCols);
  const headerRows = buildHeaderRows(visibleCols, totalDepth);
  const hasRowDetails = !!rowDetails;
  const hasSelection = !!selectionMode;

  return (
    <thead className={classnames('usx-table__head', className)} {...props}>
      <tr hidden aria-hidden="true">
        <td>
          <span
            className="usa-sr-only usa-table__announcement-region"
            aria-live="polite"
            id="usx-table-sort-announcement"
          />
        </td>
      </tr>
      {headerRows.map((row: HeaderCell[], rowIndex: number) => (
        <tr key={rowIndex} className="usx-table__head-row">
          {hasRowDetails && rowIndex === 0 && (
            <th
              scope="col"
              rowSpan={totalDepth}
              className="usx-table__cell usx-table__cell--detail-toggle"
              aria-label="Row details"
            />
          )}
          {hasSelection && selectionPosition === 'left' && rowIndex === 0 && (
            <th
              scope="col"
              rowSpan={totalDepth}
              className="usx-table__cell usx-table__cell--selection"
            >
              {selectionMode === 'checkbox' && allowSelectAll && (
                <Checkbox
                  id={`${id}-select-all`}
                  onChange={handleSelectAll}
                  ariaLabel="Select all rows"
                />
              )}
            </th>
          )}
          {row.map(({ col, rowSpan, colSpan }: HeaderCell) => {
            const isSortable = col.sortable !== false && (col.sortable || false);
            const sortDir = sortState.key === col.key ? sortState.direction : null;
            const cellClasses = classnames(
              'usx-table__cell',
              col.headerAlign && `usx-table__cell--align-${col.headerAlign}`,
              !col.headerAlign && col.align && `usx-table__cell--align-${col.align}`,
              col.headerClassName,
            );
            return (
              <th
                key={col.key}
                scope="col"
                className={cellClasses}
                rowSpan={rowSpan > 1 ? rowSpan : undefined}
                colSpan={colSpan > 1 ? colSpan : undefined}
                style={col.width ? { width: col.width } : undefined}
                aria-sort={
                  isSortable
                    ? sortDir === 'asc'
                      ? 'ascending'
                      : sortDir === 'desc'
                      ? 'descending'
                      : 'none'
                    : undefined
                }
                data-sortable={isSortable || undefined}
              >
                {isSortable ? (
                  <button
                    type="button"
                    className={classnames(
                      'usx-table__sort-button',
                      sortDir && 'usx-table__sort-button--active',
                    )}
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
          {hasSelection && selectionPosition === 'right' && rowIndex === 0 && (
            <th
              scope="col"
              rowSpan={totalDepth}
              className="usx-table__cell usx-table__cell--selection"
            >
              {selectionMode === 'checkbox' && allowSelectAll && (
                <Checkbox
                  id={`${id}-select-all`}
                  onChange={handleSelectAll}
                  ariaLabel="Select all rows"
                />
              )}
            </th>
          )}
        </tr>
      ))}
    </thead>
  );
};

export default TableHead;
