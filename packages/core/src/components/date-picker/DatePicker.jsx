import React from 'react';
import PropTypes from 'prop-types';

export default function DatePicker({ children = null, className = '', ...props }) {
  const classes = ['usx-date-picker', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'DatePicker'}
    </div>
  );
}

DatePicker.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
