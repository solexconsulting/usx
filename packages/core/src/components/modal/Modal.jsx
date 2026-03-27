import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

export default function Modal({ children = null, className = '', ...props }) {
  const classes = ['usx-modal', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Modal'}
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
