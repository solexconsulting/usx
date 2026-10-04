import React from 'react';
import Icon from '../icon/Icon';
import Label from '../label/Label';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  color?: string;
  label?: string;
  screenReaderLabel?: string;
  staticUrlPrefix?: string;
  staticBaseUrl?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 3,
  color,
  label = null,
  screenReaderLabel = null,
  staticUrlPrefix,
  staticBaseUrl,
  className = '',
  ...props
}) => {
  return (
    <span role="status" aria-live="polite" className={`usx-spinner ${className}`} {...props}>
      <Icon
        name="spinner"
        source="usx"
        size={size}
        color={color}
        staticBaseUrl={staticBaseUrl}
      />
      {screenReaderLabel && <Label screenReaderOnly={true}>{screenReaderLabel}</Label>}
      {label && <Label>{label}</Label>}
    </span>
  );
};

export default Spinner;
