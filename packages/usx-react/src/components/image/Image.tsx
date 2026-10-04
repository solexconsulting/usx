import React from 'react';
import classNames from 'classnames';
import { getAssetUrl, getAssetSrcSet } from '../../assets';

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

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
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
  staticBaseUrl?: string;
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
  staticBaseUrl,
  srcSet,
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
          srcSet={getAssetSrcSet(source.srcSet, staticBaseUrl)}
          {...(source.type ? { type: source.type } : {})}
          {...(source.sizes ? { sizes: source.sizes } : {})}
        />
      ))}
      <img src={getAssetUrl((src as ResponsiveImage).fallback, staticBaseUrl)} srcSet={srcSet ? getAssetSrcSet(srcSet, staticBaseUrl) : undefined} alt={alt} style={style} {...props} />
    </picture>
  ) : (
    <img src={getAssetUrl(src as string, staticBaseUrl)} srcSet={srcSet ? getAssetSrcSet(srcSet, staticBaseUrl) : undefined} alt={alt} style={style} {...props} />
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
