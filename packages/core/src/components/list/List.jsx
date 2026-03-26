import React from 'react';
import './list.scss';

export default function List({ children = null, className = '', ...props }) {
  const classes = ['usx-list', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'List'}
    </div>
  );
}
