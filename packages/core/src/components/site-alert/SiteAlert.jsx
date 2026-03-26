import React from 'react';
import './site-alert.scss';

export default function SiteAlert({ children = null, className = '', ...props }) {
  const classes = ['usx-site-alert', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'SiteAlert'}
    </div>
  );
}
