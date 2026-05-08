import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PaginationNavigation from './navigation/PaginationNavigation';
import PaginationStepOptions from './step-options/PaginationStepOptions';
import PaginationSummary from './summary/PaginationSummary';
import PaginationContainer from './container/PaginationContainer';
import './pagination.scss';

export default function Pagination({
  initialPage = 1,
  initialPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  totalItems,
  unbounded = false,
  onPageChange,
  onPageSizeChange,
  ariaLabel = 'Pagination',
  prevLabel = 'Previous',
  nextLabel = 'Next',
  itemLabel = 'items',
  showStepOptions = true,
  showSummary = true,
  hideLinkText = true,
  arrowsOnly = false,
  className = '',
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages =
    totalItems !== undefined && !unbounded
      ? Math.ceil(totalItems / pageSize)
      : undefined;

  // showSummary defaults to true when totalItems is provided
  const displaySummary = showSummary !== undefined ? showSummary : totalItems !== undefined;

  const handlePageChange = (pageOrFn) => {
    setCurrentPage((prev) => {
      const next = typeof pageOrFn === 'function' ? pageOrFn(prev) : pageOrFn;
      onPageChange?.(next, pageSize);
      return next;
    });
  };

  const handlePageSizeChange = (size) => {
    // Clamp current page to the new total if bounded
    const newTotalPages = totalItems ? Math.ceil(totalItems / size) : undefined;
    const newPage = newTotalPages ? Math.min(currentPage, newTotalPages) : 1;
    setPageSize(size);
    setCurrentPage(newPage);
    onPageSizeChange?.(size, newPage);
    onPageChange?.(newPage, size);
  };

  const classes = ['usx-pagination', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <PaginationContainer
        summary={
          displaySummary ? (
            <PaginationSummary
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={totalItems}
              itemLabel={itemLabel}
            />
          ) : null
        }
        navigation={
          <PaginationNavigation
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            ariaLabel={ariaLabel}
            prevLabel={prevLabel}
            nextLabel={nextLabel}
            hideLinkText={hideLinkText}
            arrowsOnly={arrowsOnly}
          />
        }
        stepOptions={
          showStepOptions ? (
            <PaginationStepOptions
              pageSize={pageSize}
              pageSizeOptions={pageSizeOptions}
              onPageSizeChange={handlePageSizeChange}
            />
          ) : null
        }
      />
    </div>
  );
}

Pagination.propTypes = {
  /** Starting page (uncontrolled) */
  initialPage: PropTypes.number,
  /** Starting page size (uncontrolled) */
  initialPageSize: PropTypes.number,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  /** Total number of items — required for bounded mode and summary */
  totalItems: PropTypes.number,
  /** Unbounded mode: no known last page */
  unbounded: PropTypes.bool,
  /** Called with (page, pageSize) on page change */
  onPageChange: PropTypes.func,
  /** Called with (pageSize, page) on page size change */
  onPageSizeChange: PropTypes.func,
  ariaLabel: PropTypes.string,
  prevLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  itemLabel: PropTypes.string,
  showStepOptions: PropTypes.bool,
  /** Defaults to true when totalItems is provided */
  showSummary: PropTypes.bool,
  hideLinkText: PropTypes.bool,
  /** Show only prev/next arrows, no page number buttons */
  arrowsOnly: PropTypes.bool,
  className: PropTypes.string,
};
