import React from 'react';
import ClassNames from 'classnames';

export interface CarouselSlide {
  content: React.ReactNode;
  label?: string;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  slides?: CarouselSlide[];
  ariaLabel?: string;
  showDots?: boolean;
  statusClassName?: string;
  children?: React.ReactNode;
  extraAttributes?: Record<string, unknown>;
}

function flattenChildren(children: React.ReactNode): React.ReactNode[] {
  return React.Children.toArray(children).flatMap((child) =>
    React.isValidElement<{ children?: React.ReactNode }>(child) && child.type === React.Fragment
      ? flattenChildren(child.props.children)
      : [child]
  );
}

export default function Carousel({
  slides = [],
  ariaLabel = 'Featured content',
  showDots = true,
  statusClassName,
  children,
  className,
  extraAttributes,
  role = 'region',
  ...props
}: CarouselProps) {
  const childSlides = flattenChildren(children);
  const items: CarouselSlide[] = childSlides.length
    ? childSlides.map((content) => ({ content }))
    : slides;
  const count = items.length;

  return (
    <div
      key={`${count}-${showDots}-${statusClassName ?? ''}`}
      {...props}
      className={ClassNames('usx-carousel', className)}
      role={role}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      data-show-dots={showDots ? undefined : 'false'}
      data-status-class-name={statusClassName}
      {...extraAttributes}
    >
      <div className="usx-carousel__viewport">
        <div className="usx-carousel__track" aria-live="polite" tabIndex={count > 1 ? 0 : undefined}>
          {count ? (
            items.map((item, index) => (
              <div
                key={index}
                className="usx-carousel__slide"
                role="group"
                aria-roledescription="slide"
                aria-label={item.label || `${index + 1} of ${count}`}
              >
                {item.content}
              </div>
            ))
          ) : (
            <p>No slides available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
