import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './avatar.scss';

const shapeClassMap = {
  circle: 'usx-circle',
  'rounded-sm': 'usx-rounded-sm',
  'rounded-md': 'usx-rounded-md',
  'rounded-lg': 'usx-rounded-lg',
  'rounded-xl': 'usx-rounded-xl',
};

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
}) {
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
          <Icon name={value} alt={alt || `${value} icon`} />
        </span>
      )
      : <img className={imgClasses} src={src} alt={alt} role="img" {...props} />;

  const avatar = (
    <a href={href} className={wrapperClasses} aria-label={(isInitialsVariant || isIconVariant) ? alt : null}>
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

Avatar.propTypes = {
  href: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  variant: PropTypes.oneOf(['image', 'initials', 'icon']),
  value: PropTypes.string,
  contentClassName: PropTypes.string,
  shape: PropTypes.oneOf([null, 'circle', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl']),
  tooltip: PropTypes.string,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
};
