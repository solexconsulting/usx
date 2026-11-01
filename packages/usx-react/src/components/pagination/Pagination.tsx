import React from 'react';
import ClassNames from 'classnames';
import PaginationNavigation from './navigation/PaginationNavigation';
import PaginationStepOptions from './step-options/PaginationStepOptions';
import PaginationSummary from './summary/PaginationSummary';
import PaginationContainer from './container/PaginationContainer';

export interface PaginationProps {
  renderPart?: 'navigation' | 'step-options' | 'summary';
  initialPage?: number;
  initialPageSize?: number;
  currentPage?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  stepOptionsId?: string;
  totalItems?: number;
  unbounded?: boolean;
  ariaLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  itemLabel?: string;
  showStepOptions?: boolean;
  showSummary?: boolean;
  hideLinkText?: boolean;
  arrowsOnly?: boolean;
  pageUrlPrefix?: string;
  className?: string;
}

export default function Pagination({
  renderPart,
  initialPage = 1,
  initialPageSize = 10,
  currentPage: page,
  pageSize: size,
  pageSizeOptions = [10, 25, 50, 100],
  stepOptionsId,
  totalItems,
  unbounded = false,
  ariaLabel = 'Pagination',
  prevLabel = 'Previous',
  nextLabel = 'Next',
  itemLabel = 'items',
  showStepOptions = true,
  showSummary = true,
  hideLinkText = true,
  arrowsOnly = false,
  pageUrlPrefix,
  className = '',
}: PaginationProps) {
  const currentPage = page ?? initialPage;
  const pageSize = size ?? initialPageSize;

  const totalPages =
    totalItems !== undefined && !unbounded
      ? Math.ceil(totalItems / pageSize)
      : undefined;

  // showSummary defaults to true when totalItems is provided
  const displaySummary = showSummary !== undefined ? showSummary : totalItems !== undefined;

  const classes = ClassNames('usx-pagination', className);

  const navigation = (
    <PaginationNavigation
      currentPage={currentPage}
      totalPages={totalPages}
      pageSize={pageSize}
      totalItems={totalItems}
      ariaLabel={ariaLabel}
      prevLabel={prevLabel}
      nextLabel={nextLabel}
      hideLinkText={hideLinkText}
      arrowsOnly={arrowsOnly}
      pageUrlPrefix={pageUrlPrefix}
    />
  );
  const stepOptions = (
    <PaginationStepOptions
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      id={stepOptionsId}
    />
  );
  const summary = typeof totalItems === 'number' ? (
    <PaginationSummary
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      itemLabel={itemLabel}
    />
  ) : null;

  if (renderPart === 'navigation') return navigation;
  if (renderPart === 'step-options') return stepOptions;
  if (renderPart === 'summary') return summary;

  return (
    <div className={classes}>
      <PaginationContainer
        summary={displaySummary ? summary : null}
        navigation={navigation}
        stepOptions={showStepOptions ? stepOptions : null}
      />
    </div>
  );
}
