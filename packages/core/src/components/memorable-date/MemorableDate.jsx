import React from 'react';
import PropTypes from 'prop-types';

export default function MemorableDate({ children = null, className = '', ...props }) {
  const classes = ['usx-memorable-date', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'MemorableDate'}
    </div>
  );
}

MemorableDate.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};