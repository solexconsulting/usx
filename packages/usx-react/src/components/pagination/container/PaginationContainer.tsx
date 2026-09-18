import React, { ReactNode, HTMLAttributes } from 'react';

export interface PaginationContainerProps extends HTMLAttributes<HTMLDivElement> {
  summary?: ReactNode;
  navigation?: ReactNode;
  stepOptions?: ReactNode;
  className?: string;
}

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
  ...props
}: PaginationContainerProps) {
  const classes = ['usx-pagination__container', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
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
