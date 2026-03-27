import React from 'react';
import PropTypes from 'prop-types';
import './select.scss';

export default function Select({ children = null, className = '', ...props }) {
  const classes = ['usx-select', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Select'}
    </div>
  );
}

Select.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
