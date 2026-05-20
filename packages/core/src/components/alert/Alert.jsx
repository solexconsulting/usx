import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

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
  ...props
}) {
  const normalizedVariant = ['info', 'warning', 'success', 'error', 'emergency'].includes(variant)
    ? variant
    : null;

  const classes = ClassNames(
    'usa-alert',
    'usx-alert',
    normalizedVariant ? `usa-alert--${normalizedVariant}` : '',
    normalizedVariant ? `usx-alert--${normalizedVariant}` : '',
    slim ? 'usa-alert--slim' : '',
    noIcon ? 'usa-alert--no-icon' : '',
    noIcon ? 'usx-alert--no-icon' : '',
    className
  )

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
          {text}
        </p>
        {onDismiss && (
          <button className="usx-alert__dismiss" aria-label="Dismiss alert" onClick={onDismiss}>
            <svg className="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img">
              <use href="/img/sprite.svg#close" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

Alert.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
  variant: PropTypes.oneOf(['info', 'warning', 'success', 'error', 'emergency']),
  slim: PropTypes.bool,
  noIcon: PropTypes.bool,
  className: PropTypes.string,
  role: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaLabelledby: PropTypes.string,
  onDismiss: PropTypes.func,
};
