import React from 'react';
import classnames from 'classnames';
import { useTableContext } from './TableContext';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  rowData?: any;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({
  rowData = null,
  selected = false,
  disabled = false,
  className = '',
  onClick,
  children,
  ...props
}) => {
  const { onClickRow } = useTableContext();
  const isClickable = !!(onClick || onClickRow);
  const classes = classnames(
    'usx-table__row',
    selected && 'usx-table__row--selected',
    disabled && 'usx-table__row--disabled',
    isClickable && !disabled && 'usx-table__row--clickable',
    className,
  );
  function handleClick(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) {
    if (disabled) return;
    if (onClick) onClick(e);
    if (onClickRow && rowData) onClickRow(rowData, e);
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLTableRowElement>) {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as any);
    }
  }
  const interactiveProps =
    isClickable && !disabled
      ? {
          tabIndex: 0,
          onClick: handleClick,
          onKeyDown: handleKeyDown,
        }
      : {};
  return (
    <tr className={classes} {...interactiveProps} {...props}>
      {children}
    </tr>
  );
};

export default TableRow;
