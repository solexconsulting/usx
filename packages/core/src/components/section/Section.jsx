import React from 'react';
import './section.scss';

export default function Section({ children = null, className = '', ...props }) {
  const classes = ['usx-section', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Section'}
    </div>
  );
}
