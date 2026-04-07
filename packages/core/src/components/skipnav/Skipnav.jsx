import React from 'react';
import './skipnav.scss';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

function normalizeHref({ href, target }) {
  if (href) return href;

  const val = target || 'main-content';

  if (typeof val !== 'string') return '#main-content';

  if (val.startsWith('#')) return val;
  // treat values containing ':' (protocol) or starting with '/' as full hrefs
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(val) || val.startsWith('/')) {
    console.error("Skipnav target value looks like a full URL. Please specify a valid target ID or use the href prop.");
    return val;
  }

  return `#${val}`;
}

export default function Skipnav({
  target,
  href,
  content,
  children = null,
  className = '',
  ...props
}) {
  const classes = ClassNames(
    'usa-skipnav',
    className
  )

  const finalHref = normalizeHref({ href, target });

  return (
    <a className={classes} href={finalHref} {...props}>
      {children || content || 'Skip to main content'}
    </a>
  );
}

Skipnav.propTypes = {
  target: PropTypes.string,
  href: PropTypes.string,
  content: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};
