import React from 'react';
import ClassNames from 'classnames';
import ButtonGroup from '../button-group/ButtonGroup';
import type { ButtonGroupItemProps } from '../button-group/ButtonGroup';
import Tag, { type TagProps } from '../tag/Tag';
import Image, { type ImageProps } from '../image/Image';
import Carousel from '../carousel/Carousel';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  tagProps?: TagProps[];
  buttonProps?: ButtonGroupItemProps[];
  imageProps?: ImageProps[];
  headerFirst?: boolean;
  flag?: boolean;
  mediaRight?: boolean;
  mediaInset?: boolean;
  mediaExdent?: boolean;
  showCarouselDots?: boolean;
  children?: React.ReactNode;
  className?: string;
  tag?: React.ElementType;
}

export default function Card({
  title,
  description,
  tagProps,
  buttonProps,
  imageProps,
  headerFirst = false,
  flag = false,
  mediaRight = false,
  mediaInset = false,
  mediaExdent = false,
  showCarouselDots = true,
  children,
  className = '',
  tag: RootTag = 'div',
  ...props
}: CardProps) {
  const cardClasses = ClassNames(
    'usa-card',
    'usx-card',
    {
      'usa-card--header-first': headerFirst,
      'usa-card--flag': flag,
      'usa-card--media-right': mediaRight,
    },
    className
  );

  const mediaClasses = ClassNames(
    'usa-card__media',
    {
      'usa-card__media--inset': mediaInset,
      'usa-card__media--exdent': mediaExdent,
    }
  );

  const hasStructuredContent = title || description || tagProps || buttonProps || imageProps;
  const shouldRenderStructured = hasStructuredContent && !children;

  const hasImages = imageProps && imageProps.length > 0;
  const useCarousel = imageProps && imageProps.length > 1;
  const media = useCarousel ? (
    <Carousel
      id={`${props.id || 'card'}-carousel`}
      showDots={showCarouselDots}
      className="usx-card__carousel"
      slides={imageProps?.map((img, index) => ({
        content: <Image key={index} hideCaption={true} {...img} />,
      }))}
    />
  ) : hasImages ? (
    <Image hideCaption={true} {...imageProps[0]} className={ClassNames('usa-card__img', imageProps[0].className)} />
  ) : null;

  return (
    <RootTag className={cardClasses} {...props}>
      <div className="usa-card__container">
        {shouldRenderStructured ? (
          <>
            {title && (
              <div className="usa-card__header">
                <h4 className="usa-card__heading">{title}</h4>
              </div>
            )}

            {media && (
              <div className={mediaClasses}>
                {media}
              </div>
            )}

            <div className="usa-card__body">
              {tagProps && tagProps.length > 0 && (
                <div className="usx-tag-group">
                  {tagProps.map((tag, index) => (
                    <Tag key={index} {...tag} />
                  ))}
                </div>
              )}
              {description && (
                typeof description === 'string' ? <p>{description}</p> : description
              )}
            </div>

            {buttonProps && buttonProps.length > 0 && (
              <div className="usa-card__footer">
                <ButtonGroup buttonProps={buttonProps} className="flex-wrap" />
              </div>
            )}
          </>
        ) : (
          children || 'Card'
        )}
      </div>
    </RootTag>
  );
}
