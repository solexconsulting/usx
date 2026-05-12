import React from 'react';
import './env-banner.scss';

export default function EnvBanner({ children = null, className = '', ...props }) {
  const classes = ['usx-env-banner', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'EnvBanner'}
    </div>
  );
}
