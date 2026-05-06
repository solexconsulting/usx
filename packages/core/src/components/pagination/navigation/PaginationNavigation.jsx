import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Icon from '../../icon/Icon';

/**
 * Calculates the page items to display for bounded pagination.
 *
 * Always produces exactly 7 slots when totalPages > 7, so the nav width
 * stays constant as the user pages through results:
 *
 *   Near start  (page ≤ 4):  1  2  3  4  5  …  last
 *   Middle:                   1  …  p-1  p  p+1  …  last
 *   Near end (page ≥ last-3): 1  …  last-4  …  last-1  last
 *
 * When totalPages ≤ 7 all pages are shown with no ellipses.
 */
function getPageItems(currentPage, totalPages) {
  const page = (p) => ({ type: 'page', page: p });
  const ellipsis = (key) => ({ type: 'ellipsis', key });

  // Show every page when the total fits within the 7-slot budget.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => page(i + 1));
  }

  // Near start — keep pages 1-5 pinned so the window doesn't shrink.
  if (currentPage < 5) {
    return [page(1), page(2), page(3), page(4), page(5), ellipsis('ellipsis-end'), page(totalPages)];
  }

  // Near end — keep the last 5 pages pinned.
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

  // Middle — anchor first and last, show current ± 1 in between.
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

/**
 * Calculates the page items for unbounded pagination (unknown total).
 * Always shows page 1, a context window around the current page,
 * and a trailing ellipsis indicating more pages exist.
 */
function getUnboundedPageItems(currentPage) {
  const items = [{ type: 'page', page: 1 }];

  if (currentPage <= 3) {
    // No leading ellipsis needed; just show pages up to current+1
    for (let p = 2; p <= currentPage + 1; p++) {
      items.push({ type: 'page', page: p });
    }
  } else {
    items.push({ type: 'ellipsis', key: 'ellipsis-start' });
    for (let p = currentPage - 1; p <= currentPage + 1; p++) {
      items.push({ type: 'page', page: p });
    }
  }

  // Trailing ellipsis signals that more pages exist
  items.push({ type: 'ellipsis', key: 'ellipsis-end' });
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
}) {
  const unbounded = totalPages === undefined || totalPages === null;
  const items = unbounded
    ? getUnboundedPageItems(currentPage)
    : getPageItems(currentPage, totalPages);

  const isFirstPage = currentPage === 1;
  const isLastPage = !unbounded && currentPage === totalPages;

  // Phantom clicks (duplicate browser events on double-click) arrive within
  // a few ms of each other. Real rapid clicks are always >50ms apart.
  const lastClickTime = useRef(0);

  const handlePage = (page) => (e) => {
    e.preventDefault();
    if (e.detail > 1) return;
    if (page !== currentPage) onPageChange(page);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (e.timeStamp - lastClickTime.current < 50) return;
    lastClickTime.current = e.timeStamp;
    if (!isFirstPage) onPageChange((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (e.timeStamp - lastClickTime.current < 50) return;
    lastClickTime.current = e.timeStamp;
    if (!isLastPage) onPageChange((prev) => unbounded ? prev + 1 : Math.min(prev + 1, totalPages));
  };

  const classes = ClassNames(
    'usa-pagination',
    'usx-pagination__nav',
    { 'usx-pagination__arrows-only': arrowsOnly },
    className
  );

  return (
    <nav aria-label={ariaLabel} className={classes}>
      <ul className="usa-pagination__list">

        {/* Previous arrow */}
        <li className="usa-pagination__item usa-pagination__arrow">
          <a
            href="#"
            className={[
              'usa-pagination__link',
              'usa-pagination__previous-page',
              isFirstPage && 'display-none',
              hideLinkText && 'padding-1 margin-0'
            ].filter(Boolean).join(' ')}
            aria-label={`${prevLabel} page`}
            aria-disabled={isFirstPage ? 'true' : undefined}
            tabIndex={isFirstPage ? -1 : undefined}
            onClick={isFirstPage ? (e) => e.preventDefault() : handlePrev}
          >
            <Icon name="navigate_before" />
            <span className={['usa-pagination__link-text', hideLinkText && 'usa-sr-only'].filter(Boolean).join(' ')}>{prevLabel}</span>
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
                className={['usa-pagination__button', isCurrent && 'usa-current'].filter(Boolean).join(' ')}
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
        <li className="usa-pagination__item usa-pagination__arrow">
          <a
            href="#"
            className={[
              'usa-pagination__link',
              'usa-pagination__next-page',
              isLastPage && 'display-none',
              hideLinkText && 'padding-1 margin-0'
            ].filter(Boolean).join(' ')}
            aria-label={`${nextLabel} page`}
            aria-disabled={isLastPage ? 'true' : undefined}
            tabIndex={isLastPage ? -1 : undefined}
            onClick={isLastPage ? (e) => e.preventDefault() : handleNext}
          >
            <span className={['usa-pagination__link-text', hideLinkText && 'usa-sr-only'].filter(Boolean).join(' ')}>{nextLabel}</span>
            <Icon name="navigate_next" />
          </a>
        </li>

      </ul>
    </nav>
  );
}

PaginationNavigation.propTypes = {
  currentPage: PropTypes.number.isRequired,
  /** Omit for unbounded (unknown total pages) mode */
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  prevLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  /** Hide the Previous/Next text labels visually (still readable by screen readers) */
  hideLinkText: PropTypes.bool,
  /** Show only the prev/next arrows, no page number buttons */
  arrowsOnly: PropTypes.bool,
  className: PropTypes.string,
};
