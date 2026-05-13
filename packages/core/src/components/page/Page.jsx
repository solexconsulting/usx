import React from 'react';
import PropTypes from 'prop-types';
import './page.scss';

export default function Page({
  title = 'Page title',
  eyebrow = null,
  children = null,
  content = null,
  className = '',
  ...props
}) {
  const classes = ['usx-page', className].filter(Boolean).join(' ');
  const pageContent = children || content;

  return (
    <main className={classes} {...props}>
      <h1 className="usx-page__title">
        {eyebrow ? <span className="usx-eyebrow">{eyebrow}</span> : null}
        {title}
      </h1>
      <div className="usx-page__content">{pageContent}</div>
    </main>
  );
}

Page.propTypes = {
  title: PropTypes.string,
  eyebrow: PropTypes.node,
  children: PropTypes.node,
  content: PropTypes.node,
  className: PropTypes.string,
};
