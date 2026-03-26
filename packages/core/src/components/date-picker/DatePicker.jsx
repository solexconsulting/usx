import React from 'react';
import './date-picker.scss';

export default function DatePicker({ children = null, className = '', ...props }) {
  const classes = ['usx-date-picker', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'DatePicker'}
    </div>
  );
}
