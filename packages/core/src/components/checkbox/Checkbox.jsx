import React from 'react';
import PropTypes from 'prop-types';
import './checkbox.scss';

export default function Checkbox({ children = null, className = '', ...props }) {
  const classes = ['usx-checkbox', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Checkbox'}
    </div>
  );
}

Checkbox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
