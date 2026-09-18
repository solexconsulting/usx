import React from 'react';
import ClassNames from 'classnames';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
  text?: string;
  variant?: 'info' | 'warning' | 'success' | 'error' | 'emergency';
  slim?: boolean;
  noIcon?: boolean;
  className?: string;
  role?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  onDismiss?: () => void;
  children?: React.ReactNode;
}

export default function Alert({
  heading,
  text,
  variant,
  slim = false,
  noIcon = false,
  className = '',
  role,
  ariaLabel,
  ariaLabelledby,
  onDismiss = undefined,
  children = null,
  ...props
}: AlertProps) {
  const normalizedVariant = variant && ['info', 'warning', 'success', 'error', 'emergency'].includes(variant)
    ? variant
    : null;

  const classes = ClassNames(
    'usa-alert',
    'usx-alert',
    normalizedVariant ? `usa-alert--${normalizedVariant}` : '',
    slim ? 'usa-alert--slim' : '',
    noIcon ? 'usa-alert--no-icon' : '',
    className
  );

  const resolvedRole = role || (
    normalizedVariant === 'error' || normalizedVariant === 'emergency'
      ? 'alert'
      : normalizedVariant === 'success'
        ? 'status'
        : 'region'
  );

  const accessibilityProps: React.HTMLAttributes<HTMLDivElement> = {
    role: resolvedRole,
  };

  if (ariaLabelledby) {
    accessibilityProps['aria-labelledby'] = ariaLabelledby;
  } else if (ariaLabel) {
    accessibilityProps['aria-label'] = ariaLabel;
  } else if (resolvedRole === 'region') {
    accessibilityProps['aria-label'] = heading || `${normalizedVariant} alert`;
  }

  return (
    <div className={classes} {...accessibilityProps} {...props}>
      <div className="usa-alert__body">
        {!slim && heading ? <h4 className="usa-alert__heading">{heading}</h4> : null}
        {children ? (
          <div className="usa-alert__text">
            {children}
          </div>
        ) : (
          <p className="usa-alert__text">
            {text}
          </p>
        )}
        {onDismiss && (
          <button className="usx-alert__dismiss" aria-label="Dismiss alert" onClick={onDismiss}>
            <svg className="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img">
              <use href="./img/sprite.svg#close" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
