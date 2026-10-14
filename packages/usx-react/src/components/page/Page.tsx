import React from 'react';
import ClassNames from 'classnames';

export interface PageProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'content'> {
  title?: React.ReactNode;
  titleId?: string;
  eyebrow?: React.ReactNode;
  element?: React.ElementType;
  content?: React.ReactNode;
  tabIndex?: number;
  ariaLabelledby?: string;
}

export default function Page({
  id = undefined,
  title = 'Page title',
  titleId = undefined,
  eyebrow = null,
  element = 'main',
  children = null,
  content = null,
  tabIndex = undefined,
  ariaLabelledby = undefined,
  className = '',
  ...props
}: PageProps) {
  const classes = ClassNames('usx-page', className);
  const pageContent = children || content;

  const Element = element;
  const labelledBy = ariaLabelledby || titleId || undefined;

  return (
    <Element
      id={id}
      className={classes}
      tabIndex={tabIndex}
      aria-labelledby={labelledBy}
      {...props}
    >
      <h1 id={titleId} className="usx-page__title">
        {eyebrow ? <span className="usx-eyebrow">{eyebrow}</span> : null}
        {title}
      </h1>
      <div className="usx-page__content">{pageContent}</div>
    </Element>
  );
}
