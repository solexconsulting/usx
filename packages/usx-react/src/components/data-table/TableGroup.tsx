import React from 'react';
import classnames from 'classnames';
import { useTableContext } from './TableContext';
import type { GroupColumn, TableRowData } from './types';

export interface TableGroupProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  label: React.ReactNode;
  groupKey: string;
  rows?: TableRowData[];
  /** Initial expanded state; runtime toggles are owned by data-table.mjs. */
  expanded?: boolean;
  colSpan?: number;
}

/** Group header and content sections, matching the Django table markup. */
export default function TableGroup({
  label, groupKey, rows = [], expanded, colSpan, className = '', children, ...props
}: TableGroupProps) {
  const { id, groupBy, expandedGroups, totalCols, groupColumns, groupValues,
    selectionMode, selectionPosition, rowDetails } = useTableContext();
  const rowClassName = typeof groupBy === 'object' && groupBy ? groupBy.rowClassName : undefined;
  const isExpanded = expanded ?? expandedGroups.has(groupKey);
  const cells: GroupColumn[] = groupColumns.length
    ? groupColumns : [{ key: '__label__', header: label, colSpan: colSpan || totalCols || 1 }];
  const contentId = `${id}-group-${groupKey}-content`;

  return <>
    <tbody className={classnames('usx-data-table__group usx-data-table__group--header', className)} {...props}>
      <tr className={classnames('usx-data-table__group-row', rowClassName)}>
        {!!groupColumns.length && rowDetails && <td className="usx-data-table__group-cell" />}
        {!!groupColumns.length && selectionMode && selectionPosition === 'left' && <td className="usx-data-table__group-cell" />}
        {cells.map((column, index) => {
          const rawValue = groupValues[groupKey]?.[column.key];
          const options = rawValue && typeof rawValue === 'object' && 'value' in rawValue
            ? rawValue as { value: React.ReactNode; backgroundColor?: string; color?: string; colSpan?: number;
              align?: 'left' | 'center' | 'right'; verticalAlign?: 'top' | 'middle' | 'bottom' } : null;
          const align = options?.align ?? column.align;
          const verticalAlign = options?.verticalAlign ?? column.verticalAlign;
          const value = options ? options.value : rawValue as React.ReactNode;
          const content = column.render ? column.render({ key: groupKey, rows }) : value;
          const Tag = index === 0 ? 'th' : 'td';
          const span = options?.colSpan || column.colSpan || 1;
          return <Tag key={column.key} scope={index === 0 ? 'row' : undefined}
            colSpan={span > 1 ? span : undefined}
            className={classnames('usx-data-table__group-cell', align && `usx-data-table__cell--align-${align}`,
              verticalAlign && `usx-data-table__cell--valign-${verticalAlign}`, column.className)}
            style={{ backgroundColor: options?.backgroundColor || column.backgroundColor,
              color: options?.color || column.color }}>
            {index === 0
              ? <button type="button" className="usx-data-table__group-toggle" aria-expanded={isExpanded}
                aria-controls={contentId}>{content ?? label}</button>
              : align === 'center' ? <div className="usx-data-table__cell-content">{content ?? null}</div> : content ?? null}
          </Tag>;
        })}
        {!!groupColumns.length && selectionMode && selectionPosition === 'right' && <td className="usx-data-table__group-cell" />}
      </tr>
    </tbody>
    <tbody className="usx-data-table__group usx-data-table__group--content" id={contentId} hidden={!isExpanded}>
      {children}
    </tbody>
  </>;
}
