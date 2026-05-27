import React, { AnchorHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import './link.scss';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: ReactNode;
  visited?: boolean;
  external?: boolean;
  alt?: boolean;
  newTab?: boolean;
  rel?: string;
  className?: string;
}

export default function Link({
  href = 'javascript:void(0);',
  children = 'a text link',
  visited = false,
  external = false,
  alt = false,
  newTab = false,
  rel = undefined,
  className = '',
  ...props
}: LinkProps) {
  const classes = classNames(
    'usa-link',
    'usx-link',
    visited && 'usx-link--visited',
    external && 'usa-link--external',
    alt && 'usa-link--alt',
    className,
  );

  const computedRel = rel || (external ? 'noreferrer' : undefined);

  return (
    <a
      href={href}
      className={classes}
      target={newTab ? '_blank' : undefined}
      rel={computedRel}
      {...props}
    >
      {children}
    </a>
  );
}
