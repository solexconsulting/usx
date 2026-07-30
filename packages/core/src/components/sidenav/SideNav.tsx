import React from 'react';
import ClassNames from 'classnames';

export interface SideNavItemType {
  text: string;
  href: string;
  current?: boolean;
  children?: SideNavItemType[];
}

interface SideNavItemProps {
  item: SideNavItemType;
  level?: number;
}

function SideNavItem({ item, level = 0 }: SideNavItemProps) {
  const { text, href, current, children } = item;
  const hasChildren = !!children && children.length > 0;

  return (
    <li className="usa-sidenav__item">
      <a
        href={href}
        className={current ? 'usa-current' : undefined}
        aria-current={current ? 'page' : undefined}
      >
        {text}
      </a>
      {hasChildren && (
        <ul className="usa-sidenav__sublist">
          {children!.map((child, i) => (
            <SideNavItem key={i} item={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: SideNavItemType[];
  sticky?: boolean;
  ariaLabel?: string;
  className?: string;
}

const SideNav: React.FC<SideNavProps> = ({
  items = [],
  sticky = false,
  ariaLabel = 'Side navigation',
  className = '',
  ...props
}) => {
  const classes = ClassNames(
    'usa-sidenav',
    'usx-sidenav',
    {
      'usx-sidenav--sticky': sticky,
    },
    className
  );

  return (
    <nav className={classes} aria-label={ariaLabel} {...props}>
      <ul className="usa-sidenav">
        {items.map((item, i) => (
          <SideNavItem key={i} item={item} />
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
