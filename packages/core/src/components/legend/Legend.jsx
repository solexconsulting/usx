import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import Required from '../required/Required';
import './legend.scss';

export default function Legend({
  text = null,
  required = false,
  large = false,
  children = null,
  className = '',
  ...props
}) {
  const classes = ClassNames(
    'usa-legend',
    'usx-legend',
    { 'usa-legend--large': large },
    className
  );

  return (
    <legend className={classes} {...props}>
      {required && <Required />}
      {children || text}
    </legend>
  );
}

Legend.propTypes = {
  text: PropTypes.string,
  required: PropTypes.bool,
  large: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};