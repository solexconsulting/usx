import React from 'react';
import classnames from 'classnames';
import { useTableContext } from './TableContext';

function aggregate(data: any[], key: string, type: string) {
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

export interface TableFootProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  children?: React.ReactNode;
}

const TableFoot: React.FC<TableFootProps> = ({ className = '', children, ...props }) => {
  const { columns, data, selectionMode, rowDetails } = useTableContext();
  if (children) {
    return (
      <tfoot className={classnames('usx-table__foot', className)} {...props}>
        {children}
      </tfoot>
    );
  }
  const visibleCols = columns.filter((c: any) => !c.hidden);
  const hasFooter = visibleCols.some((c: any) => c.footer !== undefined || c.aggregate);
  if (!hasFooter) return null;
  return (
    <tfoot className={classnames('usx-table__foot', className)} {...props}>
      <tr className="usx-table__foot-row">
        {!!rowDetails && <td className="usx-table__cell" />}
        {!!selectionMode && <td className="usx-table__cell usx-table__cell--selection" />}
        {visibleCols.map((col: any) => {
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
};

export default TableFoot;
