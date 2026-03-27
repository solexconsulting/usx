import React from 'react';
import PropTypes from 'prop-types';
import './side-nav.scss';

export default function SideNav({ children = null, className = '', ...props }) {
  const classes = ['usx-side-nav', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'SideNav'}
    </div>
  );
}

SideNav.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
