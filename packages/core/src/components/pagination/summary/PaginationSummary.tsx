import React from 'react';
import ClassNames from 'classnames';

export interface PaginationSummaryProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  itemLabel?: string;
  className?: string;
}

export default function PaginationSummary({
  currentPage,
  pageSize,
  totalItems,
  itemLabel = 'items',
  className = '',
}: PaginationSummaryProps) {
  const firstItem = (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);
  const classes = ClassNames(
    'usa-label',
    'usx-label',
    'usx-pagination__summary',
    className
  );

  return (
    <p className={classes} aria-live="polite" aria-atomic="true">
      Showing <strong>{firstItem}–{lastItem}</strong> of <strong>{totalItems}</strong> {itemLabel}
    </p>
  );
}
