import React from 'react';
import './link.scss';

export default function Link({ children = null, className = '', ...props }) {
  const classes = ['usx-link', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Link'}
    </div>
  );
}
