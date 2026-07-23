import React, { useState } from 'react';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';
import './tag.scss';

export type TagProps = {
  id?: string;
  big?: boolean;
  value?: string;
  color?: string | null;
  outline?: boolean;
  icon?: string | null;
  dismissible?: boolean;
  isDismissed?: boolean;
  onDismiss?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

const Tag: React.FC<TagProps> = ({
  id,
  big = false,
  value,
  color = null,
  outline = false,
  icon = null,
  dismissible = false,
  isDismissed = false,
  onDismiss = () => {},
  className = '',
  children,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(!isDismissed);

  const classes = ClassNames(
    'usa-tag',
    'usx-tag',
    { 'usa-tag--big': big },
    { [`bg-${color}`]: color && !outline },
    { [`text-${color}`]: color && outline },
    { 'usx-tag--outline': outline },
    className
  );

  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (onDismiss) {
      onDismiss(e);
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <span id={id} className={classes} {...props}>
      {icon && <Icon name={icon} size={3} />} {children || value}
      {dismissible && (
        <button
          type="button"
          className="usx-tag__dismiss"
          aria-label="Dismiss tag"
          onClick={handleDismiss}
        >
          <Icon name="close" size={2} />
        </button>
      )}
    </span>
  );
};

export default Tag;
