import React from 'react';
import './collection.scss';

export default function Collection({ children = null, className = '', ...props }) {
  const classes = ['usx-collection', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Collection'}
    </div>
  );
}
