import React from 'react';
import PropTypes from 'prop-types';
import './collection.scss';

export default function Collection({ children = null, className = '', ...props }) {
  const classes = ['usx-collection', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Collection'}
    </div>
  );
}

Collection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};