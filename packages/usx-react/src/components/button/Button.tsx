import React from 'react';
import Icon, { IconProps } from '../icon/Icon';
import Spinner from '../spinner/Spinner';
import ClassNames from 'classnames';

export interface ButtonIcon extends IconProps {
  /** Which side of the label to render this icon on. Defaults to 'left'. */
  position?: 'left' | 'right';
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
  loading?: boolean;
  iconProps?: ButtonIcon[];
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
  loading = false,
  iconProps = [],
  className = '',
  children = '',
  extraAttributes = {},
  ...props
}: ButtonProps) {
  const leftIcons = iconProps.filter((icon) => (icon.position ?? 'left') === 'left');
  const rightIcons = iconProps.filter((icon) => icon.position === 'right');
  const renderIcon = (icon: ButtonIcon, index: number) => {
    const { position, ...iconRest } = icon;
    return <Icon key={index} {...iconRest} />;
  };
  const spinner = loading && <Spinner size={2} />;

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
        {spinner}
        {leftIcons.map(renderIcon)}
        {children || label}
        {rightIcons.map(renderIcon)}
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
      {spinner}
      {leftIcons.map(renderIcon)}
      {children || label}
      {rightIcons.map(renderIcon)}
    </button>
  );
}
