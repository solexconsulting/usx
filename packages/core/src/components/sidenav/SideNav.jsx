import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './sidenav.scss';

// ── Sub-components ──────────────────────────────────────────────────────────

function SideNavItem({ item, level = 0 }) {
  const { text, href, current, children } = item;
  const hasChildren = children && children.length > 0;
  const isSublist = level > 0;

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
          {children.map((child, i) => (
            <SideNavItem key={i} item={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

SideNavItem.propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    current: PropTypes.bool,
    children: PropTypes.array,
  }).isRequired,
  level: PropTypes.number,
};

// ── Main SideNav ───────────────────────────────────────────────────────────

export default function SideNav({
  items = [],
  sticky = false,
  ariaLabel = 'Side navigation',
  className = '',
  ...props
}) {
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
}

SideNav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      current: PropTypes.bool,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired,
          current: PropTypes.bool,
          children: PropTypes.array, // recursive
        })
      ),
    })
  ),
  sticky: PropTypes.bool,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
};
