import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';
import './back-to-top.scss';

export default function BackToTop({
  label = 'Back to top',
  href = null,
  variant = null,
  iconPosition = 'right',
  iconSize = 2,
  className = '',
  onClick = undefined,
  ...props
}) {
  const icon = (
    <Icon name="arrow_upward" size={iconSize} />
  );

  if (href) {
    const linkClasses = ClassNames('usx-link', 'usx-no-visited', className);
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

BackToTop.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  variant: PropTypes.oneOf(['primary']),
  iconPosition: PropTypes.oneOf(['left', 'right']),
  iconSize: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
