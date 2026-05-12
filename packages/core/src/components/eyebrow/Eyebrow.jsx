import React from 'react';
import './eyebrow.scss';

export default function Eyebrow({ children = null, className = '', ...props }) {
  const classes = ['usx-eyebrow', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Eyebrow'}
    </div>
  );
}
