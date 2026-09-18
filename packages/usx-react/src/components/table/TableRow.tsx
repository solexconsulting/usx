import React from 'react';
import classnames from 'classnames';
import { useTableContext } from './TableContext';
import type { TableRowData } from './types';

export interface TableRowProps extends Omit<React.HTMLAttributes<HTMLTableRowElement>, 'onClick'> {
  /** The data object for this row (passed to the table-level onClickRow). */
  rowData?: TableRowData | null;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLTableRowElement> | React.KeyboardEvent<HTMLTableRowElement>) => void;
}

/** Renders a `<tr>`; created internally in data-driven mode, or directly by compound consumers. */
export default function TableRow({
  rowData = null,
  selected = false,
  disabled = false,
  className = '',
  onClick,
  children,
  ...props
}: TableRowProps) {
  const { onClickRow } = useTableContext();

  const isClickable = !!(onClick || onClickRow);
  const classes = classnames(
    'usx-table__row',
    selected && 'usx-table__row--selected',
    disabled && 'usx-table__row--disabled',
    isClickable && !disabled && 'usx-table__row--clickable',
    className
  );

  function handleClick(e: React.MouseEvent<HTMLTableRowElement> | React.KeyboardEvent<HTMLTableRowElement>) {
    if (disabled) return;
    onClick?.(e);
    if (onClickRow && rowData) onClickRow(rowData, e);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTableRowElement>) {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  }

  const interactiveProps = isClickable && !disabled ? { tabIndex: 0, onClick: handleClick, onKeyDown: handleKeyDown } : {};

  return (
    <tr className={classes} {...interactiveProps} {...props}>
      {children}
    </tr>
  );
}
