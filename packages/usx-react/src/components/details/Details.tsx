import React from 'react';
import ClassNames from 'classnames';

export interface DetailsProps {
  summary: string;
  text?: string;
  children?: React.ReactNode;
  open?: boolean;
  markerColor?: string;
  underlineColor?: string;
  contentBorderColor?: string;
  noContentBorder?: boolean;
  noSummaryUnderline?: boolean;
  className?: string;
  summaryClassName?: string;
  summaryTextClassName?: string;
  contentClassName?: string;
}

/** A native disclosure for optional supporting content. */
export default function Details({
  summary = 'Details',
  text = '',
  children = null,
  open = false,
  markerColor = undefined,
  underlineColor = undefined,
  contentBorderColor = undefined,
  noContentBorder = false,
  noSummaryUnderline = false,
  className = '',
  summaryClassName = '',
  summaryTextClassName = '',
  contentClassName = '',
}: DetailsProps) {
  const detailsClassName = ClassNames(
    'usx-details',
    { 'usx-details--borderless': noContentBorder },
    { 'usx-details--no-underline': noSummaryUnderline },
    className
  );
  const summaryClassNames = ClassNames(
    'usx-details__summary',
    { [`marker-${markerColor}`]: markerColor },
    summaryClassName
  );
  const summaryTextClassNames = ClassNames(
    'usx-details__summary-text',
    { [`border-${underlineColor}`]: underlineColor },
    summaryTextClassName
  );
  const compositeContentClassName = ClassNames(
    'usx-details__content',
    { [`border-${contentBorderColor}`]: !noContentBorder && contentBorderColor },
    contentClassName
  );

  return (
    <details className={detailsClassName} open={open || undefined}>
      <summary className={summaryClassNames}>
        {/* ::marker is here */}
        <span className={summaryTextClassNames}>{summary || 'Details'}</span>
      </summary>
      <div className={compositeContentClassName}>
        {children ?? <p className="usx-details__text">{text}</p>}
      </div>
    </details>
  );
}
