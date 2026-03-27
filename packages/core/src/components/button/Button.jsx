import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';
import Icon from '../icon/Icon';

export default function Button({
  label = 'Button',
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
  href,
  isExternal = false,
  big = false,
  inverse = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) {
  const variantClasses = {
    primary: 'usa-button--primary',
    secondary: 'usa-button--secondary',
    'accent-cool': 'usa-button--accent-cool',
    'accent-warm': 'usa-button--accent-warm',
    base: 'usa-button--base',
    outline: 'usa-button--outline',
    unstyled: 'usa-button--unstyled',
  };

  const variantClass = variantClasses[variant] || variantClasses['primary'];
  const modifierClasses = [
    big && 'usa-button--big',
    inverse && 'usa-button--inverse',
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

Button.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent-cool', 'accent-warm', 'base', 'outline', 'unstyled']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.string,
  isExternal: PropTypes.bool,
  big: PropTypes.bool,
  inverse: PropTypes.bool,
  leftIcon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.string,
  }),
  rightIcon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.string,
    staticUrlPrefix: PropTypes.string,
  }),
  className: PropTypes.string,
  style: PropTypes.object,
};
