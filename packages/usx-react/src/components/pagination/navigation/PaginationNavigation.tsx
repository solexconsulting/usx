import React from 'react';
import ClassNames from 'classnames';
import Icon from '../../icon/Icon';

export interface PaginationNavigationProps {
  currentPage: number;
  totalPages?: number;
  pageSize?: number;
  totalItems?: number;
  ariaLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  hideLinkText?: boolean;
  arrowsOnly?: boolean;
  pageUrlPrefix?: string;
  className?: string;
}

export function getPageItems(currentPage: number, totalPages: number) {
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

export function getUnboundedPageItems(currentPage: number) {
  const items: Array<{ type: 'page'; page: number } | { type: 'ellipsis'; key: string }> = [{ type: 'page', page: 1 }];
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
  pageSize = 10,
  totalItems,
  ariaLabel = 'Pagination',
  prevLabel = 'Previous',
  nextLabel = 'Next',
  hideLinkText = false,
  arrowsOnly = false,
  pageUrlPrefix,
  className = '',
}: PaginationNavigationProps) {
  const unbounded = totalPages === undefined || totalPages === null;
  const items = unbounded
    ? getUnboundedPageItems(currentPage)
    : getPageItems(currentPage, totalPages!);

  const isFirstPage = currentPage === 1;
  const isLastPage = !unbounded && currentPage === totalPages;
  const hrefFor = (page: number) => pageUrlPrefix ? `${pageUrlPrefix}${page}` : '#';

  const navClasses = ClassNames(
    'usa-pagination',
    'usx-pagination__nav',
    { 'usx-pagination__arrows-only': arrowsOnly },
    className
  );

  return (
    <nav
      aria-label={ariaLabel}
      className={navClasses}
      data-usx-pagination-current-page={currentPage}
      data-usx-pagination-page-size={pageSize}
      data-usx-pagination-total-items={totalItems ?? ''}
    >
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
            href={isFirstPage ? '#' : hrefFor(currentPage - 1)}
            data-usx-pagination-page={currentPage - 1}
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
                href={hrefFor(item.page)}
                data-usx-pagination-page={item.page}
                className={
                  ClassNames(
                    'usa-pagination__button',
                    isCurrent && 'usa-current'
                  )
                }
                aria-label={`Page ${item.page}`}
                aria-current={isCurrent ? 'page' : undefined}
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
            href={isLastPage ? '#' : hrefFor(currentPage + 1)}
            data-usx-pagination-page={currentPage + 1}
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
