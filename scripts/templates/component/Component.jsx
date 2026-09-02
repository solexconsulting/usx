import React from 'react';

// Styling lives in packages/usx/src/components/_{{kebab}}.scss (forwarded from
// packages/usx/src/index.scss), not a colocated import — see other components.
export default function {{Name}}({ children = null, className = '', ...props }) {
  const classes = ['usx-{{kebab}}', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || '{{Name}}'}
    </div>
  );
}
