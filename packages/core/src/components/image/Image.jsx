import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './image.scss';

export default function Image({
  src,
  alt,
  rounded = false,
  circular = false,
  caption,
  fit = false,
  maxWidth,
  maxHeight,
  className = '',
  ...props
}) {
  const classes = classNames(
    'usx-image',
    {
      'usx-image--rounded': rounded,
      'usx-image--circular': circular,
      'usx-image--fit': fit,
    },
    className
  );

  const style = {};
  if (maxWidth) style.maxWidth = maxWidth;
  if (maxHeight) style.maxHeight = maxHeight;

  if (maxHeight && !maxWidth) {
    style.width = 'auto';
  }
  if (maxWidth && !maxHeight) {
    style.height = 'auto';
  }

  const imgElement = src ? (
    <img src={src} alt={alt} style={style} {...props} />
  ) : (
    'Image'
  );

  if (caption) {
    return (
      <figure className={classes} style={style}>
        {imgElement}
        <figcaption className="usx-image--caption">{caption}</figcaption>
      </figure>
    );
  }

  return (
    <div className={classes} style={style}>
      {imgElement}
    </div>
  );
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  rounded: PropTypes.bool,
  circular: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  border: PropTypes.bool,
  shadow: PropTypes.bool,
  thumbnail: PropTypes.bool,
  caption: PropTypes.string,
  fit: PropTypes.bool,
  maintainAspectRatio: PropTypes.bool,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
