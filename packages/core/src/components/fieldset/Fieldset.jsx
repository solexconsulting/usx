import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import Legend from '../legend/Legend';
import './fieldset.scss';

export default function Fieldset({
  legend = null,
  largeLegend = false,
  required = false,
  disabled = false,
  children = null,
  className = '',
  ...props
}) {
  const classes = ClassNames(
    'usa-fieldset',
    'usx-fieldset',
    className
  );

  return (
    <fieldset className={classes} {...(disabled ? { disabled: true } : {})} {...props}>
      {legend && <Legend text={legend} required={required} large={largeLegend} />}
      {children}
    </fieldset>
  );
}

Fieldset.propTypes = {
  legend: PropTypes.string,
  largeLegend: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};