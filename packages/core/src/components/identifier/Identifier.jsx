import React from 'react';
import './identifier.scss';

export default function Identifier({ children = null, className = '', ...props }) {
  const classes = ['usx-identifier', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Identifier'}
    </div>
  );
}
