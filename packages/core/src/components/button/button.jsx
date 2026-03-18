import React from 'react';
import './button.scss';
import Icon from '../icon/icon';

export default function Button({
  label = 'Button',
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
  href,
  isExternal = false,
  size = 'small',
  inverse = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) {
  const variantClasses = {
    primary: 'usa-button--primary usx-button--primary',
    secondary: 'usa-button--secondary usx-button--secondary',
    'accent-cool': 'usa-button--accent-cool usx-button--accent-cool',
    'accent-warm': 'usa-button--accent-warm usx-button--accent-warm',
    base: 'usa-button--base usx-button--base',
    outline: 'usa-button--outline usx-button--outline',
    unstyled: 'usa-button--unstyled usx-button--unstyled',
  };

  const variantClass = variantClasses[variant] || variantClasses['primary'];
  const modifierClasses = [
    size === 'large' && 'usa-button--big usx-button--big',
    inverse && 'usa-button--inverse usx-button--inverse',
  ].filter(Boolean).join(' ');

  const classes = ['usa-button usx-button', variantClass, modifierClasses, className].filter(Boolean).join(' ');

  const Element = href ? 'a' : 'button';

  return (
    <Element
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {leftIcon && <Icon name={leftIcon.name} size={leftIcon.size} color={leftIcon.color} />}
      {label}
      {rightIcon && <Icon name={rightIcon.name} size={rightIcon.size} color={rightIcon.color} />}
    </Element>
  );
}
