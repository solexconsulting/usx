import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './avatar.scss';

const shapeClassMap = {
  circle: 'usx-circle',
  'rounded-md': 'usx-rounded-md',
  'rounded-lg': 'usx-rounded-lg',
};

export default function Avatar({
  href = '#',
  src,
  alt,
  shape = null,
  tooltip = null,
  className = '',
  imageClassName = '',
  ...props
}) {
  const wrapperClasses = classNames('usa-identifier__logo', 'usx-avatar', className);
  const imgClasses = classNames(
    'usa-identifier__logo-img',
    shape ? shapeClassMap[shape] : null,
    imageClassName,
  );

  const avatar = (
    <a href={href} className={wrapperClasses}>
      <img className={imgClasses} src={src} alt={alt} role="img" {...props} />
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
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  shape: PropTypes.oneOf([null, 'circle', 'rounded-md', 'rounded-lg']),
  tooltip: PropTypes.string,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
};
