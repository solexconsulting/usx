import React from 'react';
import PropTypes from 'prop-types';
import './breadcrumb.scss';

export default function Breadcrumb({ children = null, className = '', ...props }) {
  const classes = ['usx-breadcrumb', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Breadcrumb'}
    </div>
  );
}

Breadcrumb.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
