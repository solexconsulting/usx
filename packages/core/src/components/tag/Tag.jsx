import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';
import './tag.scss';

export default function Tag({
  id,
  big = false,
  value,
  color = null,
  icon = null,
  className = '',
  children,
  ...props
}) {
  const classes = ClassNames(
    'usa-tag',
    'usx-tag',
    { 'usa-tag--big': big },
    { [`bg-${color}`]: color },
    className
  );

  return (
    <span id={id} className={classes} {...props}>
      {icon && <Icon name={icon} size="3" />} {children || value}
    </span>
  );
}

Tag.propTypes = {
  id: PropTypes.string,
  big: PropTypes.bool,
  value: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
