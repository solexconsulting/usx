import React from 'react';
import './button.scss';
import Icon from '../icon/Icon';
import ClassNames from 'classnames';

export interface ButtonIcon {
  name: string;
  color?: string;
  size?: number | string;
  staticUrlPrefix?: string;
}

type ButtonBaseProps = {
  label?: string;
  variant?: 'primary' | 'secondary' | 'accent-cool' | 'accent-warm' | 'base' | 'outline' | 'unstyled';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  isExternal?: boolean;
  big?: boolean;
  inverse?: boolean;
  ghost?: boolean;
  leftIcon?: ButtonIcon;
  rightIcon?: ButtonIcon;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  extraAttributes?: Record<string, unknown>;
};

type AnchorButtonProps = ButtonBaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
export type ButtonProps = AnchorButtonProps | NativeButtonProps;

export default function Button({
  label,
  variant,
  type = 'button',
  disabled = false,
  onClick,
  href,
  isExternal = false,
  big = false,
  inverse = false,
  ghost = false,
  leftIcon,
  rightIcon,
  className = '',
  children = '',
  extraAttributes = {},
  ...props
}: ButtonProps) {
  const variantClasses: Record<string, string> = {
    primary: 'usa-button--primary',
    secondary: 'usa-button--secondary',
    'accent-cool': 'usa-button--accent-cool',
    'accent-warm': 'usa-button--accent-warm',
    base: 'usa-button--base',
    outline: 'usa-button--outline',
    unstyled: 'usa-button--unstyled',
  };

  const classes = ClassNames(
    'usa-button',
    'usx-button',
    variant && variantClasses[variant],
    big && 'usa-button--big',
    inverse && 'usa-button--inverse',
    ghost && 'usx-button--ghost',
    className
  );

  if (href) {
    // Only pass anchor-allowed props
    const {
      // Remove unused variables
      ...anchorProps
    } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        className={classes}
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...anchorProps}
        {...extraAttributes}
      >
        {leftIcon && (
          <Icon
            name={leftIcon.name}
            size={typeof leftIcon.size === 'string' ? parseInt(leftIcon.size, 10) || 2 : leftIcon.size}
            color={leftIcon.color ?? undefined}
          />
        )}
        {children || label}
        {rightIcon && (
          <Icon
            name={rightIcon.name}
            size={typeof rightIcon.size === 'string' ? parseInt(rightIcon.size, 10) || 2 : rightIcon.size}
            color={rightIcon.color ?? undefined}
          />
        )}
      </a>
    );
  }
  // Only pass button-allowed props
  const {
    // Remove unused variables
    ...buttonProps
  } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      {...(onClick ? { onClick } : {})}
      {...buttonProps}
      {...extraAttributes}
    >
      {leftIcon && (
        <Icon
          name={leftIcon.name}
          size={typeof leftIcon.size === 'string' ? parseInt(leftIcon.size, 10) || 2 : leftIcon.size}
          color={leftIcon.color ?? undefined}
        />
      )}
      {children || label}
      {rightIcon && (
        <Icon
          name={rightIcon.name}
          size={typeof rightIcon.size === 'string' ? parseInt(rightIcon.size, 10) || 2 : rightIcon.size}
          color={rightIcon.color ?? undefined}
        />
      )}
    </button>
  );
}
