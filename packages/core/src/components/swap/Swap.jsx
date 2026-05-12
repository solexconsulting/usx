import React from 'react';
import './swap.scss';

export default function Swap({ children = null, className = '', ...props }) {
  const classes = ['usx-swap', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Swap'}
    </div>
  );
}
