import React from 'react';
import './required.scss';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

export default function Required({
  title = 'Required',
  children = null,
  className = '',
  ...props
}) {

  const classes = ClassNames('usx-required', className);

  return (
    <>
      <abbr title={title} className={classes} {...props}>*</abbr>
      {children ? children : ''}
    </>
  );
}

Required.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};
