import React from 'react';
import PropTypes from 'prop-types';
import './list.scss';

export default function List({ items = [], ordered = false, unstyled = false, className = '', ...props }) {
  const classes = ['usa-list', 'usx-list', unstyled && 'usa-list--unstyled', className].filter(Boolean).join(' ');
  const Tag = ordered ? 'ol' : 'ul';

  return (
    <Tag className={classes} {...props}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </Tag>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
  ordered: PropTypes.bool,
  unstyled: PropTypes.bool,
  className: PropTypes.string,
};
