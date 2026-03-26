import React from 'react';
import './{{kebab}}.scss';

export default function {{Name}}({ children = null, className = '', ...props }) {
  const classes = ['usx-{{kebab}}', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || '{{Name}}'}
    </div>
  );
}
