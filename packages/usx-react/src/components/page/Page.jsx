import React from 'react';
import PropTypes from 'prop-types';

export default function Page({
  id = undefined,
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
    <main id={id} className={classes} {...props}>
      <h1 className="usx-page__title">
        {eyebrow ? <span className="usx-eyebrow">{eyebrow}</span> : null}
        {title}
      </h1>
      <div className="usx-page__content">{pageContent}</div>
    </main>
  );
}

Page.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  eyebrow: PropTypes.node,
  children: PropTypes.node,
  content: PropTypes.node,
  className: PropTypes.string,
};
