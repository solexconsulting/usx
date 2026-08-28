import React from 'react';
import ClassNames from 'classnames';
import Card, { CardProps } from '../card/Card';

export interface CardGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  cards?: CardProps[];
  className?: string;
}

export default function CardGroup({ cards = [], className = '', ...props }: CardGroupProps) {
  const classes = ClassNames(
    'usa-card-group',
    'usx-card-group',
    className
  );
  return (
    <ul className={classes} {...props}>
      {cards.map((cardProps, index) => (
        <Card key={index} {...cardProps} tag="li" />
      ))}
    </ul>
  );
}
