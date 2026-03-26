import React from 'react';
import './radio-buttons.scss';

export default function RadioButtons({ children = null, className = '', ...props }) {
  const classes = ['usx-radio-buttons', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'RadioButtons'}
    </div>
  );
}
