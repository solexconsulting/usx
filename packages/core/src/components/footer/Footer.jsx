import React from 'react';
import './footer.scss';

export default function Footer({ children = null, className = '', ...props }) {
  const classes = ['usx-footer', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Footer'}
    </div>
  );
}
