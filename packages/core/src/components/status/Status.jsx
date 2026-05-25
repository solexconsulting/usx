import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './status.scss';

export default function Status({ color = null, size = null, animation = null, className = '', ...props }) {
  const classes = ClassNames(
    'usx-status',
    color && `text-${color}`,
    size && `usx-status--${size}`,
    animation && `usx-${animation}`,
    className
  );
  return <span className={classes} {...props} />;
}

Status.propTypes = {
  color: PropTypes.oneOf(['primary', 'accent-cool', 'accent-warm', 'secondary', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  animation: PropTypes.oneOf(['ping', 'pulse', 'bounce']),
  className: PropTypes.string,
};

