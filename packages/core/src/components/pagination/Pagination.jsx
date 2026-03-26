import React from 'react';
import './pagination.scss';

export default function Pagination({ children = null, className = '', ...props }) {
  const classes = ['usx-pagination', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Pagination'}
    </div>
  );
}
