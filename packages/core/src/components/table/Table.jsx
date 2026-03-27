import React from 'react';
import PropTypes from 'prop-types';
import './table.scss';

export default function Table({ children = null, className = '', ...props }) {
  const classes = ['usx-table', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Table'}
    </div>
  );
}

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};