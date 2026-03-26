import React from 'react';
import './memorable-date.scss';

export default function MemorableDate({ children = null, className = '', ...props }) {
  const classes = ['usx-memorable-date', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'MemorableDate'}
    </div>
  );
}
