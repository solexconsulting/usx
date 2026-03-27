import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';

export default function Card({ children = null, className = '', ...props }) {
  const classes = ['usx-card', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children || 'Card'}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};