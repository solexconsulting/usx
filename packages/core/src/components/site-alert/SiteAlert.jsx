import React from 'react';
import PropTypes from 'prop-types';
import './site-alert.scss';

export default function SiteAlert({ children = null, className = '', ...props }) {
  const classes = ['usx-site-alert', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'SiteAlert'}
    </div>
  );
}

SiteAlert.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};