import React from 'react';
import classnames from 'classnames';
import type { RowKey } from './types';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  rowKey?: RowKey;
  searchValue?: string;
  selected?: boolean;
  disabled?: boolean;
  clickable?: boolean;
}

/** A data row. Interaction is attached by @solexllc/usx/js/data-table. */
export default function TableRow({
  rowKey, searchValue, selected = false, disabled = false, clickable = false,
  className = '', children, ...props
}: TableRowProps) {
  return <tr className={classnames('usx-data-table__row',
    selected && 'usx-data-table__row--selected',
    disabled && 'usx-data-table__row--disabled',
    clickable && !disabled && 'usx-data-table__row--clickable', className)}
    data-row-key={rowKey} data-search-value={searchValue}
    tabIndex={clickable && !disabled ? 0 : undefined} {...props}>{children}</tr>;
}
