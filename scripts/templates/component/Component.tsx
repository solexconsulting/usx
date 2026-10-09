import React, { HTMLAttributes, ReactNode } from 'react';
import ClassNames from 'classnames';

// Styling lives in packages/usx/src/components/_{{kebab}}.scss (forwarded from
// packages/usx/src/index.scss), not a colocated import — see other components.
export interface {{Name}}Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export default function {{Name}}({ children = null, className = '', ...props }: {{Name}}Props) {
  const classes = ClassNames('usx-{{kebab}}', className);
  return (
    <div className={classes} {...props}>
      {children || '{{Name}}'}
    </div>
  );
}
