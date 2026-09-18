import React, { ReactNode, CSSProperties, HTMLAttributes } from 'react';
import ClassNames from 'classnames';

export interface IndicatorItem {
  className?: string;
  label: string;
  style?: CSSProperties;
}

export interface IndicatorProps extends HTMLAttributes<HTMLDivElement> {
  items?: IndicatorItem[];
  children?: ReactNode;
  className?: string;
}

export default function Indicator({ items = [], children = null, className = '', ...props }: IndicatorProps) {
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
