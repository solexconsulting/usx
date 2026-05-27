import React, { useState } from 'react';
import PaginationNavigation from './navigation/PaginationNavigation';
import PaginationStepOptions from './step-options/PaginationStepOptions';
import PaginationSummary from './summary/PaginationSummary';
import PaginationContainer from './container/PaginationContainer';
import './pagination.scss';

export interface PaginationProps {
  initialPage?: number;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  totalItems?: number;
  unbounded?: boolean;
  onPageChange?: (page: number, pageSize: number) => void;
  onPageSizeChange?: (pageSize: number, page: number) => void;
  ariaLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  itemLabel?: string;
  showStepOptions?: boolean;
  showSummary?: boolean;
  hideLinkText?: boolean;
  arrowsOnly?: boolean;
  className?: string;
}

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
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages =
    totalItems !== undefined && !unbounded
      ? Math.ceil(totalItems / pageSize)
      : undefined;

  // showSummary defaults to true when totalItems is provided
  const displaySummary = showSummary !== undefined ? showSummary : totalItems !== undefined;

  const handlePageChange = (pageOrFn: number | ((prev: number) => number)) => {
    setCurrentPage((prev) => {
      const next = typeof pageOrFn === 'function' ? pageOrFn(prev) : pageOrFn;
      onPageChange?.(next, pageSize);
      return next;
    });
  };

  const handlePageSizeChange = (size: number) => {
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
          displaySummary && typeof totalItems === 'number' ? (
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
