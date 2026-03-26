import React from 'react';
import './indicator.scss';

export default function Indicator({ children = null, className = '', ...props }) {
  const classes = ['usx-indicator', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Indicator'}
    </div>
  );
}
