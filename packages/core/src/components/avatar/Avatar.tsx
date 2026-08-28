import React from 'react';
import classNames from 'classnames';
import Icon from '../icon/Icon.jsx';

const shapeClassMap = {
  circle: 'usx-circle',
  'rounded-sm': 'usx-rounded-sm',
  'rounded-md': 'usx-rounded-md',
  'rounded-lg': 'usx-rounded-lg',
  'rounded-xl': 'usx-rounded-xl',
};

export interface AvatarProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  src?: string | null;
  alt?: string | null;
  variant?: 'image' | 'initials' | 'icon';
  value?: string | null;
  shape?: null | 'circle' | 'rounded-sm' | 'rounded-md' | 'rounded-lg' | 'rounded-xl';
  tooltip?: string | null;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
}

export default function Avatar({
  href = '#',
  src = null,
  alt = null,
  variant = 'image',
  value = null,
  shape = null,
  tooltip = null,
  className = '',
  imageClassName = '',
  contentClassName = '',
  ...props
}: AvatarProps) {
  const isInitialsVariant = variant === 'initials';
  const isIconVariant = variant === 'icon';

  const wrapperClasses = classNames(
    'usx-avatar',
    className,
  );
  const imgClasses = classNames(
    'usx-avatar__img',
    shape ? shapeClassMap[shape] : null,
    imageClassName,
  );
  const contentClasses = classNames(
    'usx-avatar__content',
    shape ? shapeClassMap[shape] : 'usx-circle',
    contentClassName,
  );

  const avatarContent = isInitialsVariant
    ? <span className={contentClasses}>{value}</span>
    : isIconVariant
      ? (
        <span className={contentClasses}>
          <Icon name={value as string} alt={alt || `${value} icon`} />
        </span>
      )
      : <img className={imgClasses} src={src || undefined} alt={alt || undefined} role="img" {...props} />;

  const avatar = (
    <a href={href} className={wrapperClasses} aria-label={(isInitialsVariant || isIconVariant) ? alt || undefined : undefined}>
      {avatarContent}
    </a>
  );

  if (tooltip) {
    return (
      <span className="usx-tooltip">
        {avatar}
        <span className="usa-tooltip__body usa-tooltip__body--right" role="tooltip">{tooltip}</span>
      </span>
    );
  }

  return (
    avatar
  );
}
