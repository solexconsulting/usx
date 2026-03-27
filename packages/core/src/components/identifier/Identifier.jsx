import React from 'react';
import PropTypes from 'prop-types';
import './identifier.scss';

export default function Identifier({ children = null, className = '', ...props }) {
  const classes = ['usx-identifier', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Identifier'}
    </div>
  );
}

Identifier.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
