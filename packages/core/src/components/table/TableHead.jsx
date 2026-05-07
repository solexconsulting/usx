import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTableContext } from './TableContext';
import Icon from '../icon/Icon';

// ─── Multi-level header helpers ──────────────────────────────────────────────

/** Count the total depth of nested columns. */
function getDepth(columns) {
  let max = 1;
  columns.forEach((col) => {
    if (col.columns?.length) {
      const d = 1 + getDepth(col.columns);
      if (d > max) max = d;
    }
  });
  return max;
}

/** Count the number of leaf columns (columns with no children). */
function getLeafCount(col) {
  if (!col.columns?.length) return 1;
  return col.columns.reduce((sum, c) => sum + getLeafCount(c), 0);
}

/**
 * Flatten columns into rows for multi-level header rendering.
 * Returns an array of arrays: [[level-0 cells], [level-1 cells], ...].
 * Each cell has { col, rowSpan, colSpan }.
 *
 * Uses a single shared `rows` array filled in-place by recursion to avoid
 * the out-of-bounds merge problem that occurs when each recursive call
 * creates its own full-depth array.
 */
function buildHeaderRows(columns, totalDepth) {
  const rows = Array.from({ length: totalDepth }, () => []);

  function traverse(cols, level) {
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

// ─── Sort button ─────────────────────────────────────────────────────────────

function SortIcon({ direction }) { // eslint-disable-line react/prop-types
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

// ─── TableHead ───────────────────────────────────────────────────────────────

/**
 * TableHead — renders <thead>.
 *
 * Compound mode: wrap your own <tr> / <th> children.
 * Data-driven mode: pass no children; renders from context.columns.
 */
export default function TableHead({ className = '', children, ...props }) {
  const {
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

  // Compound component mode — activated when children are explicitly passed.
  if (children) {
    return (
      <thead className={classnames('usx-table__head', className)} {...props}>
        {children}
      </thead>
    );
  }

  // Data-driven mode
  const visibleCols = columns.filter((c) => !c.hidden);
  const totalDepth = getDepth(visibleCols);
  const headerRows = buildHeaderRows(visibleCols, totalDepth);

  // Number of extra columns inserted before/after data columns
  const hasRowDetails = !!rowDetails;
  const hasSelection = !!selectionMode;

  return (
    <thead className={classnames('usx-table__head', className)} {...props}>
      {/* Sort announcement region for screen readers */}
      <tr hidden aria-hidden="true">
        <td>
          <span
            className="usa-sr-only usa-table__announcement-region"
            aria-live="polite"
            id="usx-table-sort-announcement"
          />
        </td>
      </tr>

      {headerRows.map((row, rowIndex) => (
        <tr key={rowIndex} className="usx-table__head-row">
          {/* Row-detail expand column — only on first header row */}
          {hasRowDetails && rowIndex === 0 && (
            <th
              scope="col"
              rowSpan={totalDepth}
              className="usx-table__cell usx-table__cell--detail-toggle"
              aria-label="Row details"
            />
          )}

          {/* Selection column — only on first header row */}
          {hasSelection && selectionPosition === 'left' && rowIndex === 0 && (
            <th
              scope="col"
              rowSpan={totalDepth}
              className="usx-table__cell usx-table__cell--selection"
            >
              {selectionMode === 'checkbox' && allowSelectAll && (
                <input
                  type="checkbox"
                  className="usx-table__checkbox"
                  aria-label="Select all rows"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={handleSelectAll}
                />
              )}
            </th>
          )}

          {/* Data columns */}
          {row.map(({ col, rowSpan, colSpan }) => {
            const isSortable = col.sortable !== false && (col.sortable || false);
            const sortDir =
              sortState.key === col.key ? sortState.direction : null;

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

          {/* Selection column on right — only on first header row */}
          {hasSelection && selectionPosition === 'right' && rowIndex === 0 && (
            <th
              scope="col"
              rowSpan={totalDepth}
              className="usx-table__cell usx-table__cell--selection"
            >
              {selectionMode === 'checkbox' && allowSelectAll && (
                <input
                  type="checkbox"
                  className="usx-table__checkbox"
                  aria-label="Select all rows"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={handleSelectAll}
                />
              )}
            </th>
          )}
        </tr>
      ))}
    </thead>
  );
}

TableHead.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
