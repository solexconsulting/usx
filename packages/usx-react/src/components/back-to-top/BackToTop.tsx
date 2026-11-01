import React from 'react';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';

export type BackToTopProps = {
  label?: string | null;
  ariaLabel?: string;
  href?: string | null;
  variant?: 'primary' | null;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function BackToTop({
  label = 'Back to top',
  ariaLabel = 'Back to top',
  href = undefined,
  variant = null,
  iconPosition = 'right',
  iconSize = 2,
  className = '',
  onClick = undefined,
  ...props
}: BackToTopProps) {
  // An icon-only control has no text, so it is named by ariaLabel instead.
  const accessibleName = label ? undefined : ariaLabel;
  const icon = (
    <Icon name="arrow_upward" size={iconSize} className={
      ClassNames(
        iconPosition === 'left' ? 'margin-right-05' : 'margin-left-05'
      )
    } />
  );

  if (href) {
    const linkClasses = ClassNames(
      'usx-link',
      'usx-no-visited',
      'flex-align-center',
      className
    );
    return (
      <a className={linkClasses} href={href} aria-label={accessibleName} {...props}>
        {iconPosition === 'left' && icon}
        {label}
        {iconPosition === 'right' && icon}
      </a>
    );
  }

  const buttonClasses = ClassNames(
    'usa-button',
    'usx-button',
    variant === 'primary' && 'usa-button--primary',
    'usx-button--ghost',
    className
  );

  return (
    <button
      type="button"
      className={buttonClasses}
      aria-label={accessibleName}
      onClick={onClick || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
      {...props}
    >
      {iconPosition === 'left' && icon}
      {label}
      {iconPosition === 'right' && icon}
    </button>
  );
}
