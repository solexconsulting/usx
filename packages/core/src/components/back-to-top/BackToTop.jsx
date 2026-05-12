import React from 'react';
import './back-to-top.scss';

export default function BackToTop({ children = null, className = '', ...props }) {
  const classes = ['usx-back-to-top', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'BackToTop'}
    </div>
  );
}
