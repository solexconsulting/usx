import React from 'react';
import './range-slider.scss';

export default function RangeSlider({ children = null, className = '', ...props }) {
  const classes = ['usx-range-slider', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'RangeSlider'}
    </div>
  );
}
