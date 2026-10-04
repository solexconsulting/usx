import React from 'react';
import { getAssetUrl as assetUrl } from '../../assets';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  source?: 'uswds' | 'usx';
  size?: number;
  color?: string;
  alt?: string;
  staticBaseUrl?: string;
  staticUrlPrefix?: string;
  className?: string;
}

/**
 * Icon component for displaying SVG icons from a sprite.
 */
export default function Icon({
  name,
  source = 'uswds',
  size = 2,
  color,
  alt = name + ' icon',
  staticBaseUrl,
  staticUrlPrefix,
  className = '',
  ...props
}: IconProps) {
  const spritePrefix = staticUrlPrefix ?? assetUrl(`img/${source === 'usx' ? 'usx-sprite.svg' : 'sprite.svg'}#`, staticBaseUrl);
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
      <use href={spritePrefix + name} />
    </svg>
  );
}
