import React from 'react';

export default function Alert({
  heading = 'Informative status',
  text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
  children,
  variant = 'info',
  slim = false,
  noIcon = false,
  className = '',
  ...props
}) {
  const normalizedVariant = ['info', 'warning', 'success', 'error', 'emergency'].includes(variant)
    ? variant
    : 'info';

  const classes = [
    'usa-alert',
    `usa-alert--${normalizedVariant}`,
    slim ? 'usa-alert--slim' : '',
    noIcon ? 'usa-alert--no-icon' : '',
    'usx-alert',
    `usx-alert--${normalizedVariant}`,
    slim ? 'usx-alert--slim' : '',
    noIcon ? 'usx-alert--no-icon' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const role = normalizedVariant === 'error' || normalizedVariant === 'emergency' ? 'alert' : props.role;

  return (
    <div className={classes} role={role} {...props}>
      <div className="usa-alert__body usx-alert__body">
        {!slim && heading ? <h4 className="usa-alert__heading usx-alert__heading">{heading}</h4> : null}
        <p className="usa-alert__text usx-alert__text">
          {children ?? text}
        </p>
      </div>
    </div>
  );
}
