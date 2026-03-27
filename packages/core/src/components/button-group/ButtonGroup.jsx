import React from 'react';
import PropTypes from 'prop-types';
import './button-group.scss';

export default function ButtonGroup({ children = null, className = '', ...props }) {
  const classes = ['usx-button-group', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'ButtonGroup'}
    </div>
  );
}

ButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
