import React from 'react';
import './switch.scss';

export default function Switch({ children = null, className = '', ...props }) {
  const classes = ['usx-switch', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Switch'}
    </div>
  );
}
