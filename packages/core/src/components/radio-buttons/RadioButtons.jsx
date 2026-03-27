import React from 'react';
import PropTypes from 'prop-types';
import './radio-buttons.scss';

export default function RadioButtons({ children = null, className = '', ...props }) {
  const classes = ['usx-radio-buttons', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'RadioButtons'}
    </div>
  );
}

RadioButtons.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};