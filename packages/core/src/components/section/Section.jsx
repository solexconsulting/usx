import React from 'react';
import PropTypes from 'prop-types';
import './section.scss';

export default function Section({ title = '', children = null, content = null, className = '', ...props }) {
  const classes = ['usx-section', className].filter(Boolean).join(' ');
  const sectionContent = children || content;

  return (
    <section className={classes} {...props}>
      {title ? <h2 className="usx-section__title">{title}</h2> : null}
      <div className="usx-section__content">{sectionContent}</div>
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  content: PropTypes.node,
  className: PropTypes.string,
};
