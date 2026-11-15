import React, { useState } from 'react';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';

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
  href?: string;
  target?: string;
  rel?: string;
  extraAttributes?: Record<string, unknown>;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, 'onClick' | 'children'>;

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
  href,
  target,
  rel,
  extraAttributes = {},
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(!isDismissed);

  const interactive = Boolean(href);

  const classes = ClassNames(
    'usa-tag',
    'usx-tag',
    { 'usa-tag--big': big },
    { [`bg-${color}`]: color && !outline && !interactive },
    { [`text-${color}`]: color && outline && !interactive },
    { 'usx-tag--outline': outline || interactive },
    { 'usa-link usx-link usx-no-visited usx-tag--interactive': interactive },
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

  const content = (
    <>
      {icon && <Icon name={icon} size={big ? 3 : 2} />} {children || value}
      {dismissible && !interactive && (
        <button
          type="button"
          className="usx-tag__dismiss"
          aria-label="Dismiss tag"
          onClick={handleDismiss}
        >
          <Icon name="close" size={2} />
        </button>
      )}
    </>
  );

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target={target}
        rel={rel}
        className={classes}
        {...props}
        {...extraAttributes}
      >
        {content}
      </a>
    );
  }

  return (
    <span id={id} className={classes} {...props} {...extraAttributes}>
      {content}
    </span>
  );
};

export default Tag;
