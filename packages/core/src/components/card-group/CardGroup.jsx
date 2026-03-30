import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Card from '../card/Card';
import './card-group.scss';

export default function CardGroup({ cards = [], className = '', ...props }) {
  const classes = ClassNames(
    'usa-card-group',
    'usx-card-group',
    { className }
  )
  return (
    <ul className={classes} {...props}>
      {cards.map((cardProps, index) => (
        <Card key={index} {...cardProps} tag="li" />
      ))}
    </ul>
  );
}

CardGroup.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
};
