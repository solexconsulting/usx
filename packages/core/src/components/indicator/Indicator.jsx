import React from 'react';
import PropTypes from 'prop-types';
import './indicator.scss';

export default function Indicator({ children = null, className = '', ...props }) {
  const classes = ['usx-indicator', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Indicator'}
    </div>
  );
}

Indicator.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};