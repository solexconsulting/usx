import React from 'react';
import './combobox.scss';

export default function Combobox({ children = null, className = '', ...props }) {
  const classes = ['usx-combobox', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Combobox'}
    </div>
  );
}
