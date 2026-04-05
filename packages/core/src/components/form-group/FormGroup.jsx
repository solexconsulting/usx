import React from 'react';
import './form-group.scss';

export default function FormGroup({ children = null, className = '', ...props }) {
  const classes = ['usx-form-group', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'FormGroup'}
    </div>
  );
}
