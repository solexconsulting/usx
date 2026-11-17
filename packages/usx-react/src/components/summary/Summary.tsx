import React from 'react';
import ClassNames from 'classnames';

export interface SummaryProps {
  label?: React.ReactNode;
  children?: React.ReactNode;
  ariaLabel?: string;
  title?: string;
  className?: string;
  textClassName?: string;
  markerColor?: string;
  underlineColor?: string;
  noUnderline?: boolean;
  noMarker?: boolean;
  unstyled?: boolean;
}

export default function Summary({
  label = 'Details',
  children,
  ariaLabel,
  title,
  className = '',
  textClassName = '',
  markerColor = undefined,
  underlineColor = undefined,
  noUnderline = false,
  noMarker = false,
  unstyled = false,
}: SummaryProps) {
  if (unstyled) {
    return (
      <summary className={className || undefined} aria-label={ariaLabel} title={title}>
        {children ?? label}
      </summary>
    );
  }

  const summaryClassNames = ClassNames(
    'usx-summary',
    { [`marker-${markerColor}`]: markerColor && !noMarker },
    { 'usx-summary--no-marker': noMarker },
    { 'usx-summary--no-underline': noUnderline },
    className
  );
  const summaryTextClassNames = ClassNames(
    'usx-summary-text',
    { [`underline-${underlineColor}`]: !noUnderline && underlineColor },
    textClassName
  );
  return (
    <summary className={summaryClassNames} aria-label={ariaLabel} title={title}>
      <span className={summaryTextClassNames}>{children ?? (label || 'Details')}</span>
    </summary>
  );
}
