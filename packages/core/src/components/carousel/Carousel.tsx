import React from 'react';
import ClassNames from 'classnames';
import './carousel.scss';

export interface SlideProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  role?: string;
  ariaRoledescription?: string;
  ariaLabel?: string;
  tabIndex?: number;
  children?: React.ReactNode;
}

export function Slide({
  id,
  className = '',
  role = 'group',
  ariaRoledescription = 'slide',
  ariaLabel,
  tabIndex = 0,
  children = null,
  ...rest
}: SlideProps) {
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

export interface CarouselSlide {
  content: React.ReactNode;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  slides?: CarouselSlide[];
  ariaLabel?: string;
  className?: string;
  showDots?: boolean;
  children?: React.ReactNode;
  slideIds?: string[];
}

export default function Carousel({
  id = 'carousel-1',
  slides = [],
  ariaLabel = 'Featured content',
  className = '',
  showDots = true,
  children = null,
  slideIds = [],
  ...props
}: CarouselProps) {
  const classes = ClassNames('usx-carousel', className);
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
