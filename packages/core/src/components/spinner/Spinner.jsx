import React from 'react';
import PropTypes from 'prop-types';
import './spinner.scss';

export default function Spinner({
  size = 3,
  color = null,
  label = 'Loading...',
  omitLabel = false,
  staticUrlPrefix = '/img/usx-sprite.svg#',
  className = '',
  ...props
}) {
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
}

Spinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  label: PropTypes.string,
  omitLabel: PropTypes.bool,
  staticUrlPrefix: PropTypes.string,
  className: PropTypes.string,
};
