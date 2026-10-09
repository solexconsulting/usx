import React from 'react';
import ClassNames from 'classnames';

export interface PageProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'content'> {
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  element?: React.ElementType;
  content?: React.ReactNode;
}

export default function Page({
  id = undefined,
  title = 'Page title',
  eyebrow = null,
  element = 'main',
  children = null,
  content = null,
  className = '',
  ...props
}: PageProps) {
  const classes = ClassNames('usx-page', className);
  const pageContent = children || content;

  const Element = element;

  return (
    <Element id={id} className={classes} {...props}>
      <h1 className="usx-page__title">
        {eyebrow ? <span className="usx-eyebrow">{eyebrow}</span> : null}
        {title}
      </h1>
      <div className="usx-page__content">{pageContent}</div>
    </Element>
  );
}
