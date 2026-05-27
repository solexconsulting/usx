import React from 'react';
import classNames from 'classnames';
import './image.scss';

export interface ImageSource {
  srcSet: string;
  media?: string;
  type?: string;
  sizes?: string;
}

export interface ResponsiveImage {
  fallback: string;
  sources: ImageSource[];
}

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string | ResponsiveImage;
  alt?: string;
  href?: string;
  rounded?: boolean;
  circular?: boolean;
  caption?: string;
  hideCaption?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down' | '';
  maxWidth?: string | number;
  maxHeight?: string | number;
  className?: string;
}

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
}: ImageProps) {
  const classes = classNames(
    'usx-image',
    {
      'usx-image--rounded': rounded,
      'usx-image--circular': circular,
      [`usx-object-fit-${objectFit}`]: objectFit,
    },
    className
  );

  const style: React.CSSProperties = {};
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
      {(src as ResponsiveImage).sources.map((source, i) => (
        <source
          key={i}
          {...(source.media ? { media: source.media } : {})}
          srcSet={source.srcSet}
          {...(source.type ? { type: source.type } : {})}
          {...(source.sizes ? { sizes: source.sizes } : {})}
        />
      ))}
      <img src={(src as ResponsiveImage).fallback} alt={alt} style={style} {...props} />
    </picture>
  ) : (
    <img src={src as string} alt={alt} style={style} {...props} />
  );

  if (caption) {
    return (
      <figure className={classes} style={style}>
        {imgElement}
        <figcaption className={captionClasses} aria-hidden={hideCaption}>{caption}</figcaption>
      </figure>
    );
  }

  const Element: React.ElementType = href ? 'a' : 'div';

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
