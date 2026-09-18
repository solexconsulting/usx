import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  color?: string;
  alt?: string;
  staticUrlPrefix?: string;
  className?: string;
}

/**
 * Icon component for displaying SVG icons from a sprite.
 */
export default function Icon({
  name,
  size = 2,
  color,
  alt = name + ' icon',
  staticUrlPrefix = ((typeof window !== 'undefined' && (window as unknown as { usxBaseUrl?: string }).usxBaseUrl) || '/') + 'img/sprite.svg#',
  className = '',
  ...props
}: IconProps) {
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
}
