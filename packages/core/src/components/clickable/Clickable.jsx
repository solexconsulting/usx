import React from 'react';
import './clickable.scss';

export default function Clickable({ children = null, className = '', ...props }) {
  const classes = ['usx-clickable', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Clickable'}
    </div>
  );
}
