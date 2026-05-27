import React from 'react';
import './skipnav.scss';
import ClassNames from 'classnames';

export type SkipnavProps = {
  target?: string;
  href?: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function normalizeHref({ href, target }: { href?: string; target?: string }) {
  if (href) return href;
  const val = target || 'main-content';
  if (typeof val !== 'string') return '#main-content';
  if (val.startsWith('#')) return val;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(val) || val.startsWith('/')) {
    console.error("Skipnav target value looks like a full URL. Please specify a valid target ID or use the href prop.");
    return val;
  }
  return `#${val}`;
}

const Skipnav: React.FC<SkipnavProps> = ({
  target,
  href,
  content,
  children = null,
  className = '',
  ...props
}) => {
  const classes = ClassNames('usa-skipnav', className);
  const finalHref = normalizeHref({ href, target });
  return (
    <a className={classes} href={finalHref} {...props}>
      {children || content || 'Skip to main content'}
    </a>
  );
};

export default Skipnav;
