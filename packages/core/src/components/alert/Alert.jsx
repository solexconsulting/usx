import React from 'react';
import PropTypes from 'prop-types';

export default function Alert({
  heading = 'Informative status',
  text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
  children,
  variant = 'info',
  slim = false,
  noIcon = false,
  className = '',
  role,
  ariaLabel,
  ariaLabelledby,
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

  const resolvedRole = role || (
    normalizedVariant === 'error' || normalizedVariant === 'emergency'
      ? 'alert'
      : normalizedVariant === 'success'
        ? 'status'
        : 'region'
  );

  const accessibilityProps = {
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
      <div className="usa-alert__body usx-alert__body">
        {!slim && heading ? <h4 className="usa-alert__heading usx-alert__heading">{heading}</h4> : null}
        <p className="usa-alert__text usx-alert__text">
          {children ?? text}
        </p>
      </div>
    </div>
  );
}

Alert.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(['info', 'warning', 'success', 'error', 'emergency']),
  slim: PropTypes.bool,
  noIcon: PropTypes.bool,
  className: PropTypes.string,
  role: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaLabelledby: PropTypes.string,
};
