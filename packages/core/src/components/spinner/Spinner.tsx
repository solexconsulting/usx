import React from 'react';
import './spinner.scss';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 1 | 2 | 3 | 4 | 5;
  color?: string | null;
  label?: string;
  omitLabel?: boolean;
  staticUrlPrefix?: string;
  className?: string;
}

const getDefaultStaticUrlPrefix = () => {
  if (typeof window !== 'undefined' && (window as unknown as { usxBaseUrl?: string }).usxBaseUrl) {
    return (window as unknown as { usxBaseUrl?: string }).usxBaseUrl + 'img/usx-sprite.svg#';
  }
  return '/img/usx-sprite.svg#';
};

const Spinner: React.FC<SpinnerProps> = ({
  size = 3,
  color = null,
  label = 'Loading...',
  omitLabel = false,
  staticUrlPrefix = getDefaultStaticUrlPrefix(),
  className = '',
  ...props
}) => {
  return (
    <span role="status" aria-live="polite" className={className} {...props}>
      <svg
        className={
          'usa-icon usx-spinner ' +
          (size === 1 ? 'usx-spinner--size-1' : 'usa-icon--size-' + size) +
          (color ? ' text-' + color : '')
        }
        aria-hidden="true"
        focusable="false"
      >
        <use href={staticUrlPrefix + 'spinner'} />
      </svg>
      {!omitLabel && label && <span className="usa-sr-only">{label}</span>}
    </span>
  );
};

export default Spinner;
