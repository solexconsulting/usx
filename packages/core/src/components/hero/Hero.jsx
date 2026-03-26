import React from 'react';
import './hero.scss';

export default function Hero({ children = null, className = '', ...props }) {
  const classes = ['usx-hero', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Hero'}
    </div>
  );
}
