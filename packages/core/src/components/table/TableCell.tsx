import React from 'react';
import classnames from 'classnames';

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  as?: 'td' | 'th';
  align?: 'left' | 'center' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
  colSpan?: number;
  rowSpan?: number;
  scope?: string;
  dataLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({
  as: Tag = 'td',
  align,
  headerAlign,
  colSpan,
  rowSpan,
  scope,
  dataLabel,
  className = '',
  children,
  ...props
}) => {
  const resolvedAlign = Tag === 'th' ? (headerAlign || align) : align;
  const classes = classnames(
    'usx-table__cell',
    resolvedAlign && `usx-table__cell--align-${resolvedAlign}`,
    className,
  );
  return (
    <Tag
      className={classes}
      colSpan={colSpan}
      rowSpan={rowSpan}
      scope={scope}
      data-label={dataLabel}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default TableCell;
