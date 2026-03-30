import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './card.scss';

export default function Card({
  heading,
  body,
  footer,
  media,
  headerFirst = false,
  flag = false,
  mediaRight = false,
  mediaInset = false,
  mediaExdent = false,
  children,
  className = '',
  tag: Tag = 'div',
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

  const hasStructuredContent = heading || body || footer || media;
  const shouldRenderStructured = hasStructuredContent && !children;

  return (
    <Tag className={cardClasses} {...props}>
      <div className="usa-card__container">
        {shouldRenderStructured ? (
          <>
            {heading && (
              <div className="usa-card__header">
                <h4 className="usa-card__heading">{heading}</h4>
              </div>
            )}

            {media && (
              <div className={mediaClasses}>
                <div className="usa-card__img">
                  <img src={media.src} alt={media.alt} />
                </div>
              </div>
            )}

            {body && (
              <div className="usa-card__body">
                <p>{body}</p>
              </div>
            )}

            {footer && (
              <div className="usa-card__footer">
                {footer}
              </div>
            )}
          </>
        ) : (
          children || 'Card'
        )}
      </div>
    </Tag>
  );
}

Card.propTypes = {
  heading: PropTypes.string,
  body: PropTypes.string,
  footer: PropTypes.node,
  media: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  headerFirst: PropTypes.bool,
  flag: PropTypes.bool,
  mediaRight: PropTypes.bool,
  mediaInset: PropTypes.bool,
  mediaExdent: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.string,
};