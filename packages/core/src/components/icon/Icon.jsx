import React from 'react';
import PropTypes from 'prop-types';

/**
 * Icon component for displaying SVG icons from a sprite.
 */
export default function Icon({
    name,
    size = 2,
    color = null,
    alt = name + ' icon',
    staticUrlPrefix = ((typeof window !== 'undefined' && window.usxBaseUrl) || '/') + 'img/sprite.svg#',
    className = '',
    ...props
}) {
  return (
    <svg
      className={
        'usa-icon ' +
        (size ? (size === 1 ? 'usx-icon--size-1' : 'usa-icon--size-' + size) : '') +
        ' ' +
        (color ? 'text-' + color : '') +
        ' ' +
        className
      }
      aria-hidden="true"
      aria-label={alt}
      focusable="false"
      role="img"
      {...props}
    >
      <use href={staticUrlPrefix + name} />
    </svg>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  alt: PropTypes.string,
  staticUrlPrefix: PropTypes.string,
  className: PropTypes.string,
};
