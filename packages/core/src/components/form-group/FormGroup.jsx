import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './form-group.scss';

export default function FormGroup({ children = null, className = '', error = false, ...props }) {
  const classes = ClassNames(
    'usa-form-group',
    'usx-form-group',
    {
      'usa-form-group--error': error,
    },
    className,
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node,
  error: PropTypes.bool,
  success: PropTypes.bool,
  className: PropTypes.string,
};
