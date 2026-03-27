import React from 'react';
import PropTypes from 'prop-types';
import './combobox.scss';

export default function Combobox({ children = null, className = '', ...props }) {
  const classes = ['usx-combobox', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Combobox'}
    </div>
  );
}

Combobox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};