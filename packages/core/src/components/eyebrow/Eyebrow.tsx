import React from 'react';
import './eyebrow.scss';

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children = null, className = '', ...props }: EyebrowProps) {
  const classes = ['usx-eyebrow', className].filter(Boolean).join(' ');
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
