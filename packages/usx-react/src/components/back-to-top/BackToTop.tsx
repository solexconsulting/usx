import React from 'react';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';

export type BackToTopProps = {
  label?: string;
  href?: string | null;
  variant?: 'primary' | null;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function BackToTop({
  label = 'Back to top',
  href = undefined,
  variant = null,
  iconPosition = 'right',
  iconSize = 2,
  className = '',
  onClick = undefined,
  ...props
}: BackToTopProps) {
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
      <a className={linkClasses} href={href} {...props}>
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
      onClick={onClick || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
      {...props}
    >
      {iconPosition === 'left' && icon}
      {label}
      {iconPosition === 'right' && icon}
    </button>
  );
}
