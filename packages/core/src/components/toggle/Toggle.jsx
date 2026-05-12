import React from 'react';
import './toggle.scss';

export default function Toggle({ children = null, className = '', ...props }) {
  const classes = ['usx-toggle', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Toggle'}
    </div>
  );
}
