import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTableContext } from './TableContext';

// ─── Aggregate helpers ────────────────────────────────────────────────────────

function aggregate(data, key, type) {
  const vals = data.map((row) => Number(row[key])).filter((v) => !isNaN(v));
  if (!vals.length) return '--';
  switch (type) {
    case 'sum': return vals.reduce((a, b) => a + b, 0);
    case 'avg': return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2);
    case 'min': return Math.min(...vals);
    case 'max': return Math.max(...vals);
    case 'count': return vals.length;
    default: return '--';
  }
}

// ─── TableFoot ───────────────────────────────────────────────────────────────

/**
 * TableFoot — renders <tfoot>.
 *
 * Compound mode: pass children.
 * Data-driven mode: renders a single footer row using column.footer values
 *   or column.aggregate computations.
 */
export default function TableFoot({ className = '', children, ...props }) {
  const { columns, data, selectionMode, rowDetails } = useTableContext();

  // Compound component mode — activated when children are explicitly passed.
  if (children) {
    return (
      <tfoot className={classnames('usx-table__foot', className)} {...props}>
        {children}
      </tfoot>
    );
  }

  // Data-driven mode — only render if any column has footer or aggregate
  const visibleCols = columns.filter((c) => !c.hidden);
  const hasFooter = visibleCols.some((c) => c.footer !== undefined || c.aggregate);
  if (!hasFooter) return null;

  return (
    <tfoot className={classnames('usx-table__foot', className)} {...props}>
      <tr className="usx-table__foot-row">
        {/* Empty cell for row-detail toggle column */}
        {!!rowDetails && <td className="usx-table__cell" />}
        {/* Empty cell for selection column */}
        {!!selectionMode && <td className="usx-table__cell usx-table__cell--selection" />}

        {visibleCols.map((col) => {
          let content = '--';
          if (col.footer !== undefined) {
            content = typeof col.footer === 'function' ? col.footer(data) : col.footer;
          } else if (col.aggregate) {
            content = aggregate(data, col.key, col.aggregate);
          }

          return (
            <td
              key={col.key}
              className={classnames(
                'usx-table__cell',
                col.align && `usx-table__cell--align-${col.align}`,
              )}
            >
              {content}
            </td>
          );
        })}
      </tr>
    </tfoot>
  );
}

TableFoot.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
