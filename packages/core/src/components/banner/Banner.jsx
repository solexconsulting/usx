import React from 'react';
import PropTypes from 'prop-types';
import './banner.scss';

export default function Banner({ children = null, className = '', ...props }) {
  const classes = ['usx-banner', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Banner'}
    </div>
  );
}

Banner.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
