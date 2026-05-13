import React from 'react';
import PropTypes from 'prop-types';
import './eyebrow.scss';

export default function Eyebrow({ children = null, className = '', ...props }) {
  const classes = ['usx-eyebrow', className].filter(Boolean).join(' ');
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

Eyebrow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
