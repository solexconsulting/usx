import React from 'react';
import ClassNames from 'classnames';
import config from './config.json';

type Column = 'auto' | 'fill' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
type Spacing = '0' | '2px' | '05' | '1' | '2' | '3' | '4' | '5' | '6';

export interface ContainerLayout {
  display?: 'block' | 'flex' | 'inline' | 'inline-block' | 'inline-flex' | 'none' | 'flow-root';
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  flex?: 'auto' | 'fill' | 'none';
  gap?: Spacing;
  column?: Column;
  offset?: 'none' | Exclude<Column, 'auto' | 'fill'>;
  gutters?: 'sm' | 'md' | 'lg' | Spacing;
  float?: 'none' | 'left' | 'right';
}

export interface ContainerProps extends ContainerLayout {
  element?: 'div' | 'section' | 'article' | 'aside' | 'nav' | 'ul' | 'ol' | 'li';
  gridContainer?: 'default' | 'card' | 'card-lg' | 'mobile' | 'mobile-lg' | 'tablet' | 'tablet-lg' | 'desktop' | 'desktop-lg' | 'widescreen';
  gridRow?: boolean;
  responsive?: Partial<Record<'mobileLg' | 'tablet' | 'desktop', ContainerLayout>>;
  children?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
  id?: string;
  role?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
}

const breakpoints = [['mobileLg', 'mobile-lg'], ['tablet', 'tablet'], ['desktop', 'desktop']] as const;
const layoutKeys = [
  'display', 'direction', 'wrap', 'justify', 'align', 'alignSelf',
  'flex', 'gap', 'column', 'offset', 'gutters', 'float',
] as const;

function layoutClasses(layout: ContainerLayout, prefix = ''): string[] {
  if (!layout || typeof layout !== 'object' || Array.isArray(layout)) return [];

  return layoutKeys.flatMap((key) => {
    const value = layout[key];
    // CMS payloads may bypass TypeScript. Only emit supported utility tokens.
    if (typeof value !== 'string' || !config.props[key].options.includes(value)) return [];
    let className: string;
    if (key === 'column') className = `grid-col-${value}`;
    else if (key === 'offset') className = `grid-offset-${value}`;
    else if (key === 'gutters') className = `grid-gap-${value}`;
    else className = `usx-container--${key === 'alignSelf' ? 'align-self' : key}-${value}`;
    return [`${prefix}${className}`];
  });
}

/** An unstyled grouping element with opt-in, mobile-first layout controls. */
export default function Container({
  element = 'div',
  gridContainer,
  gridRow = false,
  display,
  direction,
  wrap,
  justify,
  align,
  alignSelf,
  flex,
  gap,
  column,
  offset,
  gutters,
  float,
  responsive,
  children,
  content,
  className = '',
  id,
  role,
  ariaLabel,
  ariaLabelledby,
}: ContainerProps) {
  const Element = config.props.element.options.includes(element) ? element : 'div';
  const classes = ClassNames(
    'usx-container',
    gridContainer && config.props.gridContainer.options.includes(gridContainer)
      ? gridContainer === 'default' ? 'grid-container' : `grid-container-${gridContainer}`
      : null,
    { 'grid-row': gridRow === true },
    layoutClasses({ display, direction, wrap, justify, align, alignSelf, flex, gap, column, offset, gutters, float }),
    breakpoints.map(([key, prefix]) => layoutClasses(responsive?.[key] ?? {}, `${prefix}:`)),
    typeof className === 'string' ? className : undefined,
  );

  return (
    <Element
      className={classes}
      id={typeof id === 'string' ? id : undefined}
      role={typeof role === 'string' ? role : undefined}
      aria-label={typeof ariaLabel === 'string' ? ariaLabel : undefined}
      aria-labelledby={typeof ariaLabelledby === 'string' ? ariaLabelledby : undefined}
    >
      {children ?? content}
    </Element>
  );
}
