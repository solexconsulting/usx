import React from 'react';
import './side-nav.scss';

export default function SideNav({ children = null, className = '', ...props }) {
  const classes = ['usx-side-nav', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'SideNav'}
    </div>
  );
}
