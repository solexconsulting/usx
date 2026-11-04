import React from 'react';
import classnames from 'classnames';
import type { Align, VerticalAlign } from './types';

export interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  as?: 'td' | 'th';
  align?: Align;
  verticalAlign?: VerticalAlign;
  headerAlign?: Align;
  colSpan?: number;
  rowSpan?: number;
  scope?: string;
  /** data-label for stacked/responsive layouts. */
  dataLabel?: string;
}

/** Renders a `<td>` or `<th>`; used by the compound API and data-driven rendering. */
export default function TableCell({
  as: Tag = 'td',
  align,
  verticalAlign,
  headerAlign,
  colSpan,
  rowSpan,
  scope,
  dataLabel,
  className = '',
  children,
  ...props
}: TableCellProps) {
  const resolvedAlign = Tag === 'th' ? headerAlign || align : align;
  const classes = classnames('usx-data-table__cell', resolvedAlign && `usx-data-table__cell--align-${resolvedAlign}`,
    verticalAlign && `usx-data-table__cell--valign-${verticalAlign}`, className);

  return (
    <Tag className={classes} colSpan={colSpan} rowSpan={rowSpan} scope={scope} data-label={dataLabel} {...props}>
      {resolvedAlign === 'center' ? <div className="usx-data-table__cell-content">{children}</div> : children}
    </Tag>
  );
}
