import React from 'react';
import './header.scss';

export default function Header({ children = null, className = '', ...props }) {
  const classes = ['usx-header', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Header'}
    </div>
  );
}
