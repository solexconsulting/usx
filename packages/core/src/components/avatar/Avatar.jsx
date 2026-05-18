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
  initials = null,
  shape = null,
  tooltip = null,
  className = '',
  imageClassName = '',
  initialsClassName = '',
  ...props
}) {
  const isInitialsVariant = Boolean(initials);
  const wrapperClasses = classNames(
    'usx-avatar',
    isInitialsVariant && 'usx-avatar--initials',
    className,
  );
  const imgClasses = classNames(
    'usx-avatar__img',
    shape ? shapeClassMap[shape] : null,
    imageClassName,
  );
  const initialsClasses = classNames(
    'usx-avatar__initials',
    shape ? shapeClassMap[shape] : 'usx-circle',
    initialsClassName,
  );

  const avatarContent = isInitialsVariant
    ? <span className={initialsClasses}>{initials}</span>
    : <img className={imgClasses} src={src} alt={alt} role="img" {...props} />;

  const avatar = (
    <a href={href} className={wrapperClasses} aria-label={isInitialsVariant ? alt : null}>
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
  initials: PropTypes.string,
  shape: PropTypes.oneOf([null, 'circle', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl']),
  tooltip: PropTypes.string,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  initialsClassName: PropTypes.string,
};
