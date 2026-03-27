import React from 'react';
import PropTypes from 'prop-types';
import './process-list.scss';

export default function ProcessList({ children = null, className = '', ...props }) {
  const classes = ['usx-process-list', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'ProcessList'}
    </div>
  );
}

ProcessList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
