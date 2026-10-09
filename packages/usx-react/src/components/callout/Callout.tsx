import React from 'react';
import ClassNames from 'classnames';

export interface CalloutProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content' | 'color'> {
  className?: string;
  strokeColor?: string;
  indent?: 'sm' | 'md' | 'lg' | 'xl' | null;
  dedent?: boolean;
  big?: boolean;
  orientation?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
  content?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  element?: 'div' | 'section' | 'aside' | 'blockquote';
  cite?: string;
}

export default function Callout({
  className,
  strokeColor,
  indent,
  dedent,
  big,
  orientation = 'horizontal',
  children,
  content,
  backgroundColor,
  textColor,
  element = 'div',
  ...props
}: CalloutProps) {
  const Element = element;

  return (
    <Element
      className={ClassNames(
        'usx-callout',
        orientation === 'vertical' && 'usx-callout--vertical',
        strokeColor && `usx-border-${strokeColor}`,
        indent && `usx-callout--indent-${indent}`,
        dedent && 'usx-callout--dedent',
        (big ?? orientation === 'horizontal') && 'usx-callout--big',
        backgroundColor && `bg-${backgroundColor}`,
        textColor && `text-${textColor}`,
        className
      )}
      {...props}
    >
      {children ?? content}
    </Element>
  );
}
