import React from 'react';
import './step-indicator.scss';

export default function StepIndicator({ children = null, className = '', ...props }) {
  const classes = ['usx-step-indicator', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'StepIndicator'}
    </div>
  );
}
