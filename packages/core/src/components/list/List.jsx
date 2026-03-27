import React from 'react';
import PropTypes from 'prop-types';
import './list.scss';

export default function List({ children = null, className = '', ...props }) {
  const classes = ['usx-list', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'List'}
    </div>
  );
}

List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
