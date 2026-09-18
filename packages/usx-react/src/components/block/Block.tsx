import React from 'react';
import classNames from 'classnames';
import Icon from '../icon/Icon';
import Attribution, { AttributionProps } from '../attribution/Attribution';


export type BlockProps =  {
  variant?: null | 'callout';
  indent?: null | 'sm' | 'md' | 'lg' | 'xl';
  dedent?: boolean;
  big?: boolean;
  quote?: boolean;
  color?: string;
  contentClassName?: string;
  attribution?: AttributionProps | null;
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Block({
  variant = null,
  indent = null,
  dedent = false,
  big = false,
  quote = false,
  color,
  contentClassName = '',
  attribution = null,
  children = null,
  className = '',
  ...props
}: BlockProps) {
  const isCallout = variant === 'callout';

  const classes = classNames(
    'usx-block',
    variant && `usx-block--${variant}`,
    dedent && 'usx-block--dedent',
    indent && `usx-block--indent-${indent}`,
    big && 'usx-block--big',
    quote && !isCallout && 'display-flex flex-row',
    isCallout && color && `usx-border-${color}`,
    className,
  );

  const contentClasses = classNames(
    'usx-block__content',
    !isCallout && color && `usx-border-${color}`,
    contentClassName,
  );

  const attributionNode = attribution ? (
    <div className="usx-block__attribution">
      <Attribution {...attribution} />
    </div>
  ) : null;

  if (quote && !isCallout) {
    return (
      <div className={classes} {...props}>
        <Icon name="format_quote" size={4} className="usx-block__open-quote-icon" />
        <div className={contentClasses}>
          {children}
          {attributionNode}
        </div>
      </div>
    );
  }

  return (
    <div className={classes} {...props}>
      <div className={contentClasses}>
        {children}
      </div>
      {attributionNode}
    </div>
  );
}
