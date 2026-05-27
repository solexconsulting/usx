import React from 'react';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';
import './tag.scss';

export type TagProps = {
  id?: string;
  big?: boolean;
  value?: string;
  color?: string | null;
  icon?: string | null;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

const Tag: React.FC<TagProps> = ({
  id,
  big = false,
  value,
  color = null,
  icon = null,
  className = '',
  children,
  ...props
}) => {
  const classes = ClassNames(
    'usa-tag',
    'usx-tag',
    { 'usa-tag--big': big },
    { [`bg-${color}`]: color },
    className
  );
  return (
    <span id={id} className={classes} {...props}>
      {icon && <Icon name={icon} size={3} />} {children || value}
    </span>
  );
};

export default Tag;
