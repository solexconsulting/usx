import React, { ElementType, AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import './clickable.scss';

// ── Sub-component helpers ────────────────────────────────────────────────────

interface SubProps {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  [key: string]: unknown;
}

function ClickableLink({
  children,
  className,
  as: Tag = 'span',
  colorChange = false,
  bgColorChange = false,
  ...rest
}: SubProps & { colorChange?: boolean; bgColorChange?: boolean }) {
  const classes = classNames(
    'usx-clickable__link',
    colorChange && 'usx-clickable__color-on-hover',
    bgColorChange && 'usx-clickable__bg-color-on-hover',
    className,
  );
  return <Tag className={classes} {...rest}>{children}</Tag>;
}

function ClickableColorChange({ children, className, as: Tag = 'span', ...rest }: SubProps) {
  return (
    <Tag className={classNames('usx-clickable__color-on-hover', className)} {...rest}>
      {children}
    </Tag>
  );
}

function ClickableBgColorChange({ children, className, as: Tag = 'span', ...rest }: SubProps) {
  return (
    <Tag className={classNames('usx-clickable__bg-color-on-hover', className)} {...rest}>
      {children}
    </Tag>
  );
}

// ── Root component ───────────────────────────────────────────────────────────

type AnchorProps = { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps = { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

export type ClickableProps = (AnchorProps | ButtonProps) & {
  className?: string;
  children?: ReactNode;
};

function Clickable({ className, children, ...rest }: ClickableProps) {
  const classes = classNames('usx-clickable', className);

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

Clickable.Link = ClickableLink;
Clickable.ColorChange = ClickableColorChange;
Clickable.BgColorChange = ClickableBgColorChange;

export default Clickable;
