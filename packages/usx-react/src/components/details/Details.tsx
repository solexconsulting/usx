import React from 'react';
import ClassNames from 'classnames';
import Summary, { type SummaryProps } from '../summary/Summary';

export interface DetailsProps {
  summaryProps?: Omit<SummaryProps, 'unstyled'>;
  text?: string;
  children?: React.ReactNode;
  open?: boolean;
  name?: string;
  contentBorderColor?: string;
  noContentBorder?: boolean;
  className?: string;
  contentClassName?: string;
}

/** A native disclosure for optional supporting content. */
export default function Details({
  summaryProps = {},
  text = '',
  children = null,
  open = false,
  name,
  contentBorderColor = undefined,
  noContentBorder = false,
  className = '',
  contentClassName = '',
}: DetailsProps) {
  const detailsClassName = ClassNames(
    'usx-details',
    { 'usx-details--borderless': noContentBorder },
    className
  );

  const compositeContentClassName = ClassNames(
    'usx-details__content',
    { [`border-${contentBorderColor}`]: !noContentBorder && contentBorderColor },
    contentClassName
  );

  return (
    <details className={detailsClassName} open={open || undefined} name={name}>
      <Summary {...summaryProps} />
      <div className={compositeContentClassName}>
        {children ?? <p className="usx-details__text">{text}</p>}
      </div>
    </details>
  );
}
