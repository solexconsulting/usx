import React from 'react';
import './checkbox.scss';

export default function Checkbox({ children = null, className = '', ...props }) {
  const classes = ['usx-checkbox', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Checkbox'}
    </div>
  );
}
