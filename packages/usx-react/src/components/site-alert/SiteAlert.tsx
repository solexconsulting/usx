import React from 'react';
import ClassNames from 'classnames';
import Alert, { AlertProps } from '../alert/Alert';

export type SiteAlertVariant = 'info' | 'emergency' | 'maintenance' | 'maintenance-warning';

export interface SiteAlertProps extends Omit<AlertProps, 'variant'> {
  variant?: SiteAlertVariant;
  alertHeading?: string;
  alertText?: string;
  alertContent?: React.ReactNode;
  role?: 'alert' | 'status';
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

  const classes = ClassNames(
    'usa-site-alert',
    'usx-site-alert',
    (normalizedVariant === 'info' || normalizedVariant === 'emergency') && `usa-site-alert--${normalizedVariant}`,
    (normalizedVariant === 'maintenance' || normalizedVariant === 'maintenance-warning') && `usx-site-alert--${normalizedVariant}`,
    slim && 'usa-site-alert--slim',
    noIcon && 'usa-site-alert--no-icon',
    onDismiss && 'usa-site-alert--dismissible',
    className
  );

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
        variant={alertVariant as unknown as AlertProps['variant']}
        slim={slim}
        noIcon={noIcon}
        onDismiss={onDismiss}
      >
        {alertContent}
      </Alert>
    </section>
  );
};

export default SiteAlert;
