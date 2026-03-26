import React from 'react';
import './modal.scss';

export default function Modal({ children = null, className = '', ...props }) {
  const classes = ['usx-modal', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Modal'}
    </div>
  );
}
