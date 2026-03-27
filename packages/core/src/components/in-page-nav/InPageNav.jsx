import React from 'react';
import PropTypes from 'prop-types';
import './in-page-nav.scss';

export default function InPageNav({ children = null, className = '', ...props }) {
  const classes = ['usx-in-page-nav', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'InPageNav'}
    </div>
  );
}

InPageNav.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
