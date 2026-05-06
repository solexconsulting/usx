import React from 'react';
import PropTypes from 'prop-types';

/**
 * Responsive layout container for pagination subcomponents.
 *
 * On mobile: stacks vertically (summary → nav → step options).
 * On desktop: summary on the left, nav centered, step options on the right.
 */
export default function PaginationContainer({
  summary,
  navigation,
  stepOptions,
  className = '',
}) {
  const classes = ['usx-pagination__container', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {summary && (
        <div className="usx-pagination__container-summary">{summary}</div>
      )}
      {(stepOptions || navigation) && (
        <div className="usx-pagination__container-end">
            {stepOptions && stepOptions}
            {navigation && navigation}
        </div>
      )}
    </div>
  );
}

PaginationContainer.propTypes = {
  summary: PropTypes.node,
  navigation: PropTypes.node,
  stepOptions: PropTypes.node,
  className: PropTypes.string,
};
