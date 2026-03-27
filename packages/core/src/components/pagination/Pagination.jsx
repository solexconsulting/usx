import React from 'react';
import PropTypes from 'prop-types';
import './pagination.scss';

export default function Pagination({ children = null, className = '', ...props }) {
  const classes = ['usx-pagination', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Pagination'}
    </div>
  );
}

Pagination.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};