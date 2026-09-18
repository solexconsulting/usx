import React, { useRef } from 'react';
import ClassNames from 'classnames';
import Icon from '../../icon/Icon';

export interface PaginationNavigationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number | ((prev: number) => number)) => void;
  ariaLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  hideLinkText?: boolean;
  arrowsOnly?: boolean;
  className?: string;
}

function getPageItems(currentPage: number, totalPages: number) {
  const page = (p: number) => ({ type: 'page' as const, page: p });
  const ellipsis = (key: string) => ({ type: 'ellipsis' as const, key });

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => page(i + 1));
  }
  if (currentPage < 5) {
    return [page(1), page(2), page(3), page(4), page(5), ellipsis('ellipsis-end'), page(totalPages)];
  }
  if (currentPage > totalPages - 4) {
    return [
      page(1),
      ellipsis('ellipsis-start'),
      page(totalPages - 4),
      page(totalPages - 3),
      page(totalPages - 2),
      page(totalPages - 1),
      page(totalPages),
    ];
  }
  return [
    page(1),
    ellipsis('ellipsis-start'),
    page(currentPage - 1),
    page(currentPage),
    page(currentPage + 1),
    ellipsis('ellipsis-end'),
    page(totalPages),
  ];
}

function getUnboundedPageItems(currentPage: number) {
  const items = [{ type: 'page' as const, page: 1 }];
  if (currentPage <= 3) {
    for (let p = 2; p <= currentPage + 1; p++) {
      items.push({ type: 'page' as const, page: p });
    }
  } else {
    items.push({ type: 'ellipsis' as const, key: 'ellipsis-start' });
    for (let p = currentPage - 1; p <= currentPage + 1; p++) {
      items.push({ type: 'page' as const, page: p });
    }
  }
  items.push({ type: 'ellipsis' as const, key: 'ellipsis-end' });
  return items;
}

export default function PaginationNavigation({
  currentPage,
  totalPages,
  onPageChange,
  ariaLabel = 'Pagination',
  prevLabel = 'Previous',
  nextLabel = 'Next',
  hideLinkText = false,
  arrowsOnly = false,
  className = '',
}: PaginationNavigationProps) {
  const unbounded = totalPages === undefined || totalPages === null;
  const items = unbounded
    ? getUnboundedPageItems(currentPage)
    : getPageItems(currentPage, totalPages!);

  const isFirstPage = currentPage === 1;
  const isLastPage = !unbounded && currentPage === totalPages;
  const lastClickTime = useRef(0);

  const handlePage = (page: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (e.detail > 1) return;
    if (page !== currentPage) onPageChange(page);
  };

  const handlePrev = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (e.timeStamp - lastClickTime.current < 50) return;
    lastClickTime.current = e.timeStamp;
    if (!isFirstPage) onPageChange((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (e.timeStamp - lastClickTime.current < 50) return;
    lastClickTime.current = e.timeStamp;
    if (!isLastPage) onPageChange((prev) => unbounded ? prev + 1 : Math.min(prev + 1, totalPages!));
  };

  const navClasses = ClassNames(
    'usa-pagination',
    'usx-pagination__nav',
    { 'usx-pagination__arrows-only': arrowsOnly },
    className
  );

  return (
    <nav aria-label={ariaLabel} className={navClasses}>
      <ul className="usa-pagination__list">
        {/* Previous arrow */}
        <li
          className={
            ClassNames(
              'usa-pagination__item',
              'usa-pagination__arrow',
            )
          }
        >
          <a
            href="#"
            className={
              ClassNames(
                'usa-pagination__link',
                'usa-pagination__previous-page',
                isFirstPage && 'display-none',
                hideLinkText && 'padding-1 margin-0'
              )
            }
            aria-label={`${prevLabel} page`}
            aria-disabled={isFirstPage ? 'true' : undefined}
            tabIndex={isFirstPage ? -1 : undefined}
            onClick={isFirstPage ? (e) => e.preventDefault() : handlePrev}
          >
            <Icon name="navigate_before" />
            <span
              className={
                ClassNames(
                  'usa-pagination__link-text', hideLinkText && 'usa-sr-only'
                )
              }
            >{prevLabel}</span>
          </a>
        </li>
        {/* Page number / ellipsis items */}
        {!arrowsOnly && items.map((item, index) => {
          if (item.type === 'ellipsis') {
            return (
              <li
                key={item.key || `ellipsis-${index}`}
                className="usa-pagination__item usa-pagination__overflow"
                aria-hidden="true"
              >
                <span>…</span>
              </li>
            );
          }
          const isCurrent = item.page === currentPage;
          return (
            <li key={item.page} className="usa-pagination__item usa-pagination__page-no">
              <a
                href="#"
                className={
                  ClassNames(
                    'usa-pagination__button',
                    isCurrent && 'usa-current'
                  )
                }
                aria-label={`Page ${item.page}`}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={handlePage(item.page)}
              >
                {item.page}
              </a>
            </li>
          );
        })}
        {/* Next arrow */}
        <li
          className={
            ClassNames(
              'usa-pagination__item',
              'usa-pagination__arrow',
            )
          }
        >
          <a
            href="#"
            className={
              ClassNames(
                'usa-pagination__link',
                'usa-pagination__next-page',
                isLastPage && 'display-none',
                hideLinkText && 'padding-1 margin-0'
              )
            }
            aria-label={`${nextLabel} page`}
            aria-disabled={isLastPage ? 'true' : undefined}
            tabIndex={isLastPage ? -1 : undefined}
            onClick={isLastPage ? (e) => e.preventDefault() : handleNext}
          >
            <span
              className={
                ClassNames(
                  'usa-pagination__link-text', hideLinkText && 'usa-sr-only'
                )
              }
            >{nextLabel}</span>
            <Icon name="navigate_next" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
