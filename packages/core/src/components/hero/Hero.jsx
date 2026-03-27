import React from 'react';
import PropTypes from 'prop-types';
import './hero.scss';

export default function Hero({ children = null, className = '', ...props }) {
  const classes = ['usx-hero', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Hero'}
    </div>
  );
}

Hero.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};