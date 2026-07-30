import React, { AnchorHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

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
  children,
  visited = false,
  external = false,
  alt = false,
  newTab = false,
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

  return (
    <a
      href={href}
      className={classes}
      target={newTab || external ? '_blank' : undefined}
      rel={newTab || external ? 'noreferrer noopener' : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
