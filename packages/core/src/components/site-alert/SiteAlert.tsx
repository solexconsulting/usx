import React from 'react';
import Alert from '../alert/Alert';
import Icon from '../icon/Icon';
import './site-alert.scss';

export type SiteAlertVariant = 'info' | 'emergency' | 'maintenance' | 'maintenance-warning';

export interface SiteAlertProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  variant?: SiteAlertVariant;
  slim?: boolean;
  noIcon?: boolean;
  onDismiss?: (() => void);
  alertHeading?: string;
  alertText?: string;
  alertContent?: React.ReactNode;
  role?: 'alert' | 'status';
  ariaLabel?: string;
  ariaLabelledby?: string;
}

const SiteAlert: React.FC<SiteAlertProps> = ({
  className = '',
  variant = 'info',
  slim = false,
  noIcon = false,
  onDismiss,
  alertHeading = 'Short alert message',
  alertText = 'Additional context and followup information including a link.',
  alertContent = null,
  role,
  ariaLabel = 'Site alert',
  ariaLabelledby,
  ...props
}) => {
  const normalizedVariant: SiteAlertVariant = ['info', 'emergency', 'maintenance', 'maintenance-warning'].includes(variant)
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
    onDismiss && 'usa-site-alert--dismissible',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const alertClasses = [
    'usa-alert',
    `usa-alert--${alertVariant}`,
    'usx-alert',
    `usx-alert--${alertVariant}`,
    slim && 'usa-alert--slim',
    slim && 'usx-alert--slim',
    noIcon && 'usa-alert--no-icon',
    noIcon && 'usx-alert--no-icon',
  ].filter(Boolean).join(' ');

  return (
    <section
      className={classes}
      role={role}
      aria-label={ariaLabelledby ? undefined : ariaLabel}
      aria-labelledby={ariaLabelledby}
      {...props}
    >
      {alertContent ? (
        <div className={alertClasses}>
          <div className="usa-alert__body usx-alert__body">
            {alertHeading && <h4 className="usa-alert__heading usx-alert__heading">{alertHeading}</h4>}
            {alertContent}
            {onDismiss && (
              <button
                className="usx-alert__dismiss"
                aria-label="Close alert"
                onClick={onDismiss}
              >
                <Icon name="close" size={3} aria-hidden="true" focusable="false" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <Alert
          heading={alertHeading}
          text={alertText}
          variant={alertVariant as any}
          slim={slim}
          noIcon={noIcon}
          onDismiss={onDismiss}
        />
      )}
    </section>
  );
};

export default SiteAlert;
