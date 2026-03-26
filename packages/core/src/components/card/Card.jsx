import React from 'react';
import './card.scss';

export default function Card({ children = null, className = '', ...props }) {
  const classes = ['usx-card', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Card'}
    </div>
  );
}
