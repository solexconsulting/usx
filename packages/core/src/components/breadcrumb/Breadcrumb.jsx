import React from 'react';
import './breadcrumb.scss';

export default function Breadcrumb({ children = null, className = '', ...props }) {
  const classes = ['usx-breadcrumb', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Breadcrumb'}
    </div>
  );
}
