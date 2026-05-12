import React from 'react';
import './page.scss';

export default function Page({ children = null, className = '', ...props }) {
  const classes = ['usx-page', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Page'}
    </div>
  );
}
