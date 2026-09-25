import React from 'react';

import classNames from 'classnames';

export interface InPageNavProps extends React.HTMLAttributes<HTMLElement> {
  headingElements?: string;
  mainContentSelector?: string | null;
  titleHeadingLevel?: string;
  titleText?: string;
  scrollOffset?: string | number;
  rootMargin?: string;
  threshold?: string | number;
  minimumHeadingCount?: string | number;
  contentClassName?: string;
}

// USWDS's own JS (usa-in-page-navigation) builds the <nav>/<ul> list into
// the empty <aside> below by reading headings out of the element matched by
// data-main-content-selector — it does not render anything itself. Call ONLY
// `.init()` around this component the same way other JS-enhanced components
// (DatePicker, FileInput, RangeSlider) do — never `.on()`/`.off()`; see the
// story decorators and Combobox.tsx for why.
export default function InPageNav({
  id = 'in-page-nav',
  headingElements = 'h2 h3',
  mainContentSelector = null,
  titleHeadingLevel = 'h4',
  titleText = 'On this page',
  scrollOffset = 0,
  rootMargin = '0px 0px 0px 0px',
  threshold = 1,
  minimumHeadingCount = 2,
  content = '',
  children = null,
  className = '',
  contentClassName = '',
  ...props
}: InPageNavProps) {
  const contentId = `${id}-content`;
  // Real USWDS points data-main-content-selector at a real <main> landmark,
  // but that only works for a single instance per page — Storybook (and any
  // page rendering more than one InPageNav, e.g. the Theme Playground) can
  // have several on screen at once, and document.querySelector('main')
  // would only ever find the first. Defaulting to this instance's own id
  // keeps every instance independently observable.
  const resolvedSelector = mainContentSelector || `#${contentId}`;

  return (
    <div className="usa-in-page-nav-container usx-in-page-nav-container">
      <aside
        id={id}
        className={classNames('usa-in-page-nav', 'usx-in-page-nav', className)}
        data-heading-elements={headingElements}
        data-main-content-selector={resolvedSelector}
        data-title-heading-level={titleHeadingLevel}
        data-title-text={titleText}
        data-scroll-offset={scrollOffset}
        data-root-margin={rootMargin}
        data-threshold={threshold}
        data-minimum-heading-count={minimumHeadingCount}
        {...props}
      />
      <div
        id={contentId}
        className={classNames('usx-in-page-nav__content', 'usa-prose', contentClassName)}
        {...(children ? {} : { dangerouslySetInnerHTML: { __html: content } })}
      >
        {children || null}
      </div>
    </div>
  );
}
