import React from 'react';
import PropTypes from 'prop-types';
import './footer.scss';

export default function Footer({ children = null, className = '', ...props }) {
  const classes = ['usx-footer', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Footer'}
    </div>
  );
}

Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
