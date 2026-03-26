import React from 'react';
import './file-input.scss';

export default function FileInput({ children = null, className = '', ...props }) {
  const classes = ['usx-file-input', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'FileInput'}
    </div>
  );
}
