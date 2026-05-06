import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export default function PaginationSummary({
  currentPage,
  pageSize,
  totalItems,
  itemLabel = 'items',
  className = '',
}) {
  const firstItem = (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);
  const classes = ClassNames(
    'usa-label',
    'usx-label',
    'usx-pagination__summary',
    className
  )

  return (
    <p className={classes} aria-live="polite" aria-atomic="true">
      Showing <strong>{firstItem}–{lastItem}</strong> of <strong>{totalItems}</strong> {itemLabel}
    </p>
  );
}

PaginationSummary.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemLabel: PropTypes.string,
  className: PropTypes.string,
};
