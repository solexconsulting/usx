import React from 'react';
import './table.scss';

export default function Table({ children = null, className = '', ...props }) {
  const classes = ['usx-table', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Table'}
    </div>
  );
}
