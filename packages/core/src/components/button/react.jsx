import React from 'react';
import './button.scss';

export default function Button({
  label = 'Button',
  variant,
  type = 'button',
  className = '',
  big = false,
  inverse = false,
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
    big && 'usa-button--big usx-button--big',
    inverse && 'usa-button--inverse usx-button--inverse',
  ].filter(Boolean).join(' ');

  const classes = ['usa-button usx-button', variantClass, modifierClasses, className].filter(Boolean).join(' ');

  return (
    <button type={type} className={classes} {...props}>
      {label}
    </button>
  );
}
