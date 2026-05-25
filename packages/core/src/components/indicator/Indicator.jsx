import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './indicator.scss';

export default function Indicator({ items = [], children = null, className = '', ...props }) {
  const classes = ClassNames('usx-indicator', className);
  return (
    <div className={classes} {...props}>
      {items.map((item, index) => (
        <span
          key={index}
          className={ClassNames('usx-indicator-item', item.className)}
          style={item.style}
        >
          {item.label}
        </span>
      ))}
      {children}
    </div>
  );
}

Indicator.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    label: PropTypes.string,
    style: PropTypes.object,
  })),
  children: PropTypes.node,
  className: PropTypes.string,
};
