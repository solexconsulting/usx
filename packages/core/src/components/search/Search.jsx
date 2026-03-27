import React from 'react';
import PropTypes from 'prop-types';
import './search.scss';

export default function Search({ children = null, className = '', ...props }) {
  const classes = ['usx-search', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Search'}
    </div>
  );
}

Search.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
