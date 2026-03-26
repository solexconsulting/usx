import React from 'react';
import './time-picker.scss';

export default function TimePicker({ children = null, className = '', ...props }) {
  const classes = ['usx-time-picker', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'TimePicker'}
    </div>
  );
}
