import React from 'react';
import './avatar.scss';

export default function Avatar({ children = null, className = '', ...props }) {
  const classes = ['usx-avatar', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Avatar'}
    </div>
  );
}
