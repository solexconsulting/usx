import React from 'react';
import PropTypes from 'prop-types';

export default function RangeSlider({ children = null, className = '', ...props }) {
  const classes = ['usx-range-slider', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'RangeSlider'}
    </div>
  );
}

RangeSlider.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};