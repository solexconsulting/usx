import React from 'react';

export interface PageProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'content'> {
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  content?: React.ReactNode;
}

export default function Page({
  id = undefined,
  title = 'Page title',
  eyebrow = null,
  children = null,
  content = null,
  className = '',
  ...props
}: PageProps) {
  const classes = ['usx-page', className].filter(Boolean).join(' ');
  const pageContent = children || content;

  return (
    <main id={id} className={classes} {...props}>
      <h1 className="usx-page__title">
        {eyebrow ? <span className="usx-eyebrow">{eyebrow}</span> : null}
        {title}
      </h1>
      <div className="usx-page__content">{pageContent}</div>
    </main>
  );
}
