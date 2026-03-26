import React from 'react';
import './search.scss';

export default function Search({ children = null, className = '', ...props }) {
  const classes = ['usx-search', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Search'}
    </div>
  );
}
