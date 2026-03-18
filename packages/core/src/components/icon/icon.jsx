import React from 'react';

/**
 * Icon component for displaying SVG icons from a sprite.
 */
export default function Icon({
    name,
    size=2,
    color=null,
    staticUrlPrefix='/img/sprite.svg#',
    className='',
    ...props
}) {
  return (
    <svg
      className={`
        usa-icon
        ${size ? `usa-icon--size-${size}` : ''}
        ${color ? `text-${color}` : ''}
        ${className}
      `}
      aria-hidden="true"
      focusable="false"
      role="img"
      {...props}
    >
      <use href={`${staticUrlPrefix}${name}`} />
    </svg>
  );
};
