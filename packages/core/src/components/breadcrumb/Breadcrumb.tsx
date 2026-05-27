import React from 'react';
import './breadcrumb.scss';

export interface BreadcrumbItem {
  href?: string;
  label: string;
  current?: boolean;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items?: BreadcrumbItem[] | null;
  wrap?: boolean;
  rdfa?: boolean;
  ariaLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Breadcrumb({
  items = null,
  wrap = false,
  rdfa = false,
  ariaLabel = 'Breadcrumbs',
  className = '',
  children = null,
  ...props
}: BreadcrumbProps) {
  if (!items || items.length === 0) {
    const classes = ['usx-breadcrumb', className].filter(Boolean).join(' ');
    return (
      <div className={classes} {...props}>
        {children || 'Breadcrumb'}
      </div>
    );
  }

  const navClasses = ['usa-breadcrumb', 'usx-breadcrumb', wrap ? 'usa-breadcrumb--wrap' : null, className]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={navClasses} aria-label={ariaLabel} {...props}>
      <ol
        className="usa-breadcrumb__list"
        {...(rdfa ? { vocab: 'http://schema.org/', typeof: 'BreadcrumbList' } : {})}
      >
        {items.map((item, idx) => {
          const isCurrent = !!item.current;
          const liClass = ['usa-breadcrumb__list-item', isCurrent ? 'usa-current' : null].filter(Boolean).join(' ');

          return (
            <li
              key={idx}
              className={liClass}
              {...(isCurrent ? { 'aria-current': 'page' } : {})}
              {...(rdfa ? { property: 'itemListElement', typeof: 'ListItem' } : {})}
            >
              {isCurrent ? (
                <span {...(rdfa ? { property: 'name' } : {})}>{item.label}</span>
              ) : (
                <a
                  href={item.href || '#'}
                  className="usa-breadcrumb__link"
                  {...(rdfa ? { property: 'item', typeof: 'WebPage' } : {})}
                >
                  <span {...(rdfa ? { property: 'name' } : {})}>{item.label}</span>
                </a>
              )}
              {rdfa && <meta property="position" content={String(idx + 1)} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
