import React from 'react';
import PropTypes from 'prop-types';
import './file-input.scss';

export default function FileInput({ children = null, className = '', ...props }) {
  const classes = ['usx-file-input', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'FileInput'}
    </div>
  );
}

FileInput.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};