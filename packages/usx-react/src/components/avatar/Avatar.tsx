import React from 'react';
import classNames from 'classnames';
import Icon from '../icon/Icon.jsx';
import Tooltip from '../tooltip/Tooltip';
import type { TooltipProps } from '../tooltip/Tooltip';

const shapeClassMap = {
  circle: 'usx-circle',
  'rounded-sm': 'usx-rounded-sm',
  'rounded-md': 'usx-rounded-md',
  'rounded-lg': 'usx-rounded-lg',
  'rounded-xl': 'usx-rounded-xl',
};

export interface AvatarProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'onClick'
> {
  href?: string;
  src?: string | null;
  alt?: string | null;
  variant?: 'image' | 'initials' | 'icon';
  value?: string | null;
  shape?: null | 'circle' | 'rounded-sm' | 'rounded-md' | 'rounded-lg' | 'rounded-xl';
  /** Existing border utility color name used for the 4px status ring. */
  statusRingColor?: string | null;
  /** Host-supplied status text appended to the accessible name. */
  statusLabel?: string | null;
  tooltipProps?: Omit<TooltipProps, 'children'> | null;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
}

export default function Avatar({
  href,
  src = null,
  alt = null,
  variant = 'image',
  value = null,
  shape = null,
  statusRingColor = null,
  statusLabel = null,
  tooltipProps = null,
  className = '',
  imageClassName = '',
  contentClassName = '',
  ...props
}: AvatarProps) {
  const isInitialsVariant = variant === 'initials';
  const isIconVariant = variant === 'icon';
  const ringColor = statusRingColor?.trim();
  const label = statusLabel?.trim();
  const accessibleLabel = label ? [alt, label].filter(Boolean).join(', ') : alt || undefined;

  const wrapperClasses = classNames(
    'usx-avatar',
    ringColor && 'border-05',
    ringColor && `border-${ringColor}`,
    ringColor &&
      (shape ? shapeClassMap[shape] : isInitialsVariant || isIconVariant ? 'usx-circle' : null),
    className
  );
  const imgClasses = classNames(
    'usx-avatar__img',
    shape ? shapeClassMap[shape] : null,
    imageClassName
  );
  const contentClasses = classNames(
    'usx-avatar__content',
    shape ? shapeClassMap[shape] : 'usx-circle',
    contentClassName
  );

  const avatarContent = isInitialsVariant ? (
    <span className={contentClasses}>{value}</span>
  ) : isIconVariant ? (
    <span className={contentClasses}>
      <Icon name={value as string} alt={alt ? undefined : `${value} icon`} />
    </span>
  ) : (
    <img
      className={imgClasses}
      src={src || undefined}
      alt={alt || undefined}
      role="img"
      {...props}
    />
  );

  const avatar = href ? (
    <a
      href={href}
      className={wrapperClasses}
      aria-label={
        label ? accessibleLabel : isInitialsVariant || isIconVariant ? alt || undefined : undefined
      }
    >
      {avatarContent}
    </a>
  ) : (
    <span
      className={wrapperClasses}
      role={label ? 'img' : undefined}
      aria-label={
        label ? accessibleLabel : isInitialsVariant || isIconVariant ? alt || undefined : undefined
      }
    >
      {avatarContent}
    </span>
  );

  return tooltipProps ? <Tooltip {...tooltipProps}>{avatar}</Tooltip> : avatar;
}
