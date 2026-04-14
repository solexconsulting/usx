import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './image.scss';

export default function Image({
  src,
  alt,
  href,
  rounded = false,
  circular = false,
  caption,
  hideCaption = false,
  objectFit = '',
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
      [`usx-object-fit-${objectFit}`]: objectFit,
    },
    className
  );

  const style = {};
  if (maxWidth) style.maxWidth = maxWidth;
  if (maxHeight) style.maxHeight = maxHeight;
  if (maxHeight && !maxWidth) style.width = 'auto';
  if (maxWidth && !maxHeight) style.height = 'auto';

  const captionClasses = classNames(
    'usx-image--caption',
    { 'usa-sr-only': hideCaption }
  );

  const isResponsive = src && typeof src === 'object';

  const imgElement = !src ? (
    'Image'
  ) : isResponsive ? (
    <picture>
      {src.sources.map((source, i) => (
        <source
          key={i}
          {...(source.media ? { media: source.media } : {})}
          srcSet={source.srcSet}
          {...(source.type ? { type: source.type } : {})}
          {...(source.sizes ? { sizes: source.sizes } : {})}
        />
      ))}
      <img src={src.fallback} alt={alt} style={style} {...props} />
    </picture>
  ) : (
    <img src={src} alt={alt} style={style} {...props} />
  );

  if (caption) {
    return (
      <figure className={classes} style={style}>
        {imgElement}
        <figcaption className={captionClasses} aria-hidden={hideCaption}>{caption}</figcaption>
      </figure>
    );
  }

  const Element = href ? 'a' : 'div';

  return (
    <Element
      {...(href ? { href } : {})}
      className={classes}
      style={style}
    >
      {imgElement}
    </Element>
  );
}

const sourcePropType = PropTypes.shape({
  srcSet: PropTypes.string.isRequired,
  media: PropTypes.string,
  type: PropTypes.string,
  sizes: PropTypes.string,
});

Image.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      fallback: PropTypes.string.isRequired,
      sources: PropTypes.arrayOf(sourcePropType).isRequired,
    }),
  ]),
  alt: PropTypes.string,
  href: PropTypes.string,
  rounded: PropTypes.bool,
  circular: PropTypes.bool,
  caption: PropTypes.string,
  hideCaption: PropTypes.bool,
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
