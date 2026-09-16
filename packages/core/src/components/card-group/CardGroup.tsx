import React from 'react';
import ClassNames from 'classnames';
import Card, { CardProps } from '../card/Card';

export interface CardGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  cardProps?: CardProps[];
  className?: string;
}

export default function CardGroup({ cardProps = [], className = '', ...props }: CardGroupProps) {
  const classes = ClassNames(
    'usa-card-group',
    'usx-card-group',
    className
  );
  return (
    <ul className={classes} {...props}>
      {cardProps.map((card, index) => (
        <Card key={index} {...card} tag="li" />
      ))}
    </ul>
  );
}
