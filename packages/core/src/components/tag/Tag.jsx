import React from 'react';
import PropTypes from 'prop-types';
import './tag.scss';

export default function Tag({ children = null, className = '', ...props }) {
  const classes = ['usx-tag', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Tag'}
    </div>
  );
}

Tag.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
