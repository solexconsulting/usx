import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../alert/Alert';
import Icon from '../icon/Icon';
import './site-alert.scss';

export default function SiteAlert({
  className = '',
  variant = 'info',
  slim = false,
  noIcon = false,
  dismissible = false,
  alertHeading = 'Short alert message',
  alertText = 'Additional context and followup information including a link.',
  alertContent = null,
  role,
  ariaLabel = 'Site alert',
  ariaLabelledby,
  ...props
}) {
  const normalizedVariant = ['info', 'emergency', 'maintenance', 'maintenance-warning'].includes(variant)
    ? variant
    : 'info';

  const alertVariant = normalizedVariant === 'maintenance'
    ? 'error'
    : normalizedVariant === 'maintenance-warning'
      ? 'warning'
      : normalizedVariant;

  const classes = [
    'usa-site-alert',
    'usx-site-alert',
    (normalizedVariant === 'info' || normalizedVariant === 'emergency') && `usa-site-alert--${normalizedVariant}`,
    (normalizedVariant === 'maintenance' || normalizedVariant === 'maintenance-warning') && `usx-site-alert--${normalizedVariant}`,
    slim && 'usa-site-alert--slim',
    noIcon && 'usa-site-alert--no-icon',
    dismissible && 'usa-site-alert--dismissible',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      className={classes}
      role={role}
      aria-label={ariaLabelledby ? undefined : ariaLabel}
      aria-labelledby={ariaLabelledby}
      {...props}
    >
      <Alert
        heading={alertHeading}
        text={alertText}
        variant={alertVariant}
        slim={slim}
        noIcon={noIcon}
      >
        {alertContent}
      </Alert>
      {dismissible && (
        <button
          className="usx-site-alert__close"
          aria-label="Close alert"
          onClick={(e) => e.currentTarget.closest('.usa-site-alert')?.remove()}
        >
          <Icon name="close" size={3} aria-hidden="true" focusable="false" />
        </button>
      )}
    </section>
  );
}

SiteAlert.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['info', 'emergency', 'maintenance', 'maintenance-warning']),
  slim: PropTypes.bool,
  noIcon: PropTypes.bool,
  dismissible: PropTypes.bool,
  alertHeading: PropTypes.string,
  alertText: PropTypes.string,
  alertContent: PropTypes.node,
  role: PropTypes.oneOf(['alert', 'status']),
  ariaLabel: PropTypes.string,
  ariaLabelledby: PropTypes.string,
};