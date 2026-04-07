import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Button from '../button/Button';
import './button-group.scss';

export default function ButtonGroup({
  items = [],
  segmented = false,
  className = '',
  ...props
}) {
  const classes = ClassNames(
    'usa-button-group usx-button-group',
    segmented && 'usa-button-group--segmented',
    className
  );
  return (
    <ul className={classes} {...props}>
      {items.map((item, index) => (
        <li key={index} className="usa-button-group__item">
          <Button {...item}>
            {item.children}
          </Button>
        </li>
      ))}
    </ul>
  );
}

ButtonGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
  segmented: PropTypes.bool,
  className: PropTypes.string,
};
