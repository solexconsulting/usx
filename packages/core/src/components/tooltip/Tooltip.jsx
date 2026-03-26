import React from 'react';
import './tooltip.scss';

export default function Tooltip({ children = null, className = '', ...props }) {
  const classes = ['usx-tooltip', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Tooltip'}
    </div>
  );
}
