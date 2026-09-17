import React, { HTMLAttributes, ReactNode } from 'react';

// Styling lives in packages/usx/src/components/_{{kebab}}.scss (forwarded from
// packages/usx/src/index.scss), not a colocated import — see other components.
export interface {{Name}}Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export default function {{Name}}({ children = null, className = '', ...props }: {{Name}}Props) {
  const classes = ['usx-{{kebab}}', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || '{{Name}}'}
    </div>
  );
}
