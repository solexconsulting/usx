import React from 'react';
import ClassNames from 'classnames';
import ButtonGroup from '../button-group/ButtonGroup';
import Tag from '../tag/Tag';
import Image from '../image/Image';
import Carousel from '../carousel/Carousel';
import './card.scss';

export interface CardTag {
  value: string;
  color?: string;
}

export interface CardAction {
  children: string;
  variant?: string;
  onClick?: () => void;
}

export interface CardImage {
  src: string;
  alt: string;
}

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  tags?: CardTag[];
  actions?: CardAction[];
  images?: CardImage[];
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
  tags,
  actions,
  images,
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

  const hasStructuredContent = title || description || tags || actions || images;
  const shouldRenderStructured = hasStructuredContent && !children;

  const hasImages = images && images.length > 0;
  const useCarousel = images && images.length > 1;
  const media = useCarousel ? (
    <Carousel
      id={`${props.id || 'card'}-carousel`}
      showDots={showCarouselDots}
      className="usx-card__carousel"
      slides={images?.map((img, index) => (
        <Image key={index} {...img} hideCaption={true} />
      ))}
    />
  ) : hasImages ? (
    <Image {...images[0]} hideCaption={true} className="usa-card__img" />
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
              {tags && tags.length > 0 && (
                <div className="usx-tag-group">
                  {tags.map((tag, index) => (
                    <Tag key={index} {...tag} />
                  ))}
                </div>
              )}
              {description && (
                  <p>{description}</p>
              )}
            </div>

            {actions && actions.length > 0 && (
              <div className="usa-card__footer">
                <ButtonGroup items={actions} className="flex-wrap" />
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
