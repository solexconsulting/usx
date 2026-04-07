import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import ButtonGroup from '../button-group/ButtonGroup';
import Tag from '../tag/Tag';
import Image from '../image/Image';
import './card.scss';

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
  children,
  className = '',
  tag: RootTag = 'div',
  ...props
}) {
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

  // Get the first image if images array is provided
  const firstImage = images && images.length > 0 ? images[0] : null;

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

            {firstImage && (
              <div className={mediaClasses}>
                <Image {...firstImage} hideCaption={true} className="usa-card__img" />
              </div>
            )}

            <div className="usa-card__body">
              {tags && tags.length > 0 && (
                <div className="usx-tag--group">
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

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    color: PropTypes.string,
  })),
  actions: PropTypes.arrayOf(PropTypes.shape({
    children: PropTypes.string.isRequired,
    variant: PropTypes.string,
    onClick: PropTypes.func,
  })),
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  })),
  headerFirst: PropTypes.bool,
  flag: PropTypes.bool,
  mediaRight: PropTypes.bool,
  mediaInset: PropTypes.bool,
  mediaExdent: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.string,
};