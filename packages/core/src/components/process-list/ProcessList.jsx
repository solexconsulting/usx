import React from 'react';
import './process-list.scss';

export default function ProcessList({ children = null, className = '', ...props }) {
  const classes = ['usx-process-list', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'ProcessList'}
    </div>
  );
}
