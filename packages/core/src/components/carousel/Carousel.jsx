import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './carousel.scss';

export function Slide({
  id,
  className = '',
  role = 'group',
  ariaRoledescription = 'slide',
  ariaLabel,
  tabIndex = 0,
  children = null,
  ...rest
}) {
  const cls = ['usx-carousel__slide', className].filter(Boolean).join(' ');
  return (
    <section
      id={id}
      className={cls}
      role={role}
      aria-roledescription={ariaRoledescription}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      {...rest}
    >
      {children}
    </section>
  );
}

Slide.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  role: PropTypes.string,
  ariaRoledescription: PropTypes.string,
  ariaLabel: PropTypes.string,
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
};

export default function Carousel({
  id = 'carousel-1',
  slides = [],
  ariaLabel = 'Featured content',
  className = '',
  showDots = true,
  children = null,
  slideIds = [],
  ...props
}) {
  const classes = ClassNames('usx-carousel', className);
  // If children are provided, render them as-is and use `slideIds` (if given)
  // to build navigation links. We intentionally do not modify or normalize
  // children so developers retain full control.
  const childArray = React.Children.toArray(children).filter(Boolean);
  return (
    <div className={classes} {...props} role="region" aria-roledescription="carousel" aria-label={ariaLabel}>
      <div className="usx-carousel__viewport" tabIndex={-1}>
        <div className="usx-carousel__track">
          {childArray.length > 0 ? (
            childArray
          ) : slides.length > 0 ? (
            slides.map((slide, i) => (
              <Slide
                id={`${id}-slide-${i + 1}`}
                key={i}
                className=""
                ariaLabel={`${i + 1} of ${slides.length}`}
                tabIndex={0}
              >
                {slide?.content || slide}
              </Slide>
            ))
          ) : (
            <p><em>No slides available.</em></p>
          )}
        </div>
      </div>

      {showDots && (
        <div className="usx-carousel__dots" aria-label="Slide navigation">
          {slides?.map((_, i) => (
            <a key={i} href={`#${id}-slide-${i + 1}`} aria-label={`Go to slide ${i + 1}`} tabIndex={-1} />
          ))}
          {childArray.length > 0 && slideIds.length === childArray.length && slideIds.map((slideId, i) => (
            <a key={i} href={slideId} aria-label={`Go to slide ${i + 1}`} tabIndex={-1} />
          ))}
        </div>
      )}
    </div>
  );
}

Carousel.propTypes = {
  id: PropTypes.string,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.node.isRequired,
    })
  ),
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  showDots: PropTypes.bool,
  children: PropTypes.node,
};
