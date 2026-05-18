import React from 'react';
import classNames from 'classnames';
import './link.scss';

export default function Link({
  href = 'javascript:void(0);',
  children = 'a text link',
  visited = false,
  external = false,
  alt = false,
  newTab = false,
  rel = null,
  className = '',
  ...props
}) {
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
