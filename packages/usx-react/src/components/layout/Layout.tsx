import React, { useState, ReactNode, HTMLAttributes } from 'react';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';
import Button from '../button/Button';

// ── Sub-components ──────────────────────────────────────────────────────────

export interface SingleColumnLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  expandButton?: ReactNode;
  className?: string;
}

export function SingleColumnLayout({ children, expandButton = null, className = '', ...props }: SingleColumnLayoutProps) {
  const classes = ['usx-layout__single-column', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {expandButton}
      {children}
    </div>
  );
}

export type GridLayoutProps = {
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
  expandLeftSidebar?: boolean;
  expandRightSidebar?: boolean;
  expandButton?: ReactNode;
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function GridLayout({
  leftSidebar,
  rightSidebar,
  expandLeftSidebar,
  expandRightSidebar,
  expandButton = null,
  children,
  className = '',
  ...props
}: GridLayoutProps) {
  const contentModifier = (
    rightSidebar && !leftSidebar ? 'left'
      : leftSidebar && !rightSidebar ? 'right'
        : null
  );

  const contentClasses = ClassNames(
    'usx-layout__content',
    {
      'usx-layout__content--left': contentModifier === 'left',
      'usx-layout__content--right': contentModifier === 'right',
    },
  );
  const containerClasses = ClassNames(
    'usx-layout__grid-container',
    className,
  );
  const leftSidebarClasses = ClassNames(
    'usx-layout__sidebar--left',
    {
      'usx-layout__sidebar--expanded': expandLeftSidebar,
    }
  );
  const rightSidebarClasses = ClassNames(
    'usx-layout__sidebar--right',
    {
      'usx-layout__sidebar--expanded': expandRightSidebar,
    }
  );

  return (
    <div className={containerClasses} {...props}>
      {leftSidebar && (
        <aside className={leftSidebarClasses}>{leftSidebar}</aside>
      )}
      <main className={contentClasses}>
        {expandButton}
        {children}
      </main>
      {rightSidebar && (
        <aside className={rightSidebarClasses}>{rightSidebar}</aside>
      )}
    </div>
  );
}


// ── Main Layout ─────────────────────────────────────────────────────────────

export type LayoutProps = {
  variant?: 'single-column' | 'grid';
  children?: ReactNode;
  content?: ReactNode;
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
  expandLeftSidebar?: boolean;
  expandRightSidebar?: boolean;
  /** Adds a toggle button that grows the layout to a wider max-width via the `usx-expanded` class. */
  expandable?: boolean;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Layout({
  variant = 'single-column',
  children,
  content,
  leftSidebar,
  rightSidebar,
  expandLeftSidebar,
  expandRightSidebar,
  expandable = false,
  className = '',
  ...props
}: LayoutProps) {
  const [expanded, setExpanded] = useState(false);

  const classes = ClassNames(
    'usx-layout',
    { 'usx-expanded': expandable && expanded },
    className,
  );

  const expandButton = expandable ? (
    <Button
      variant="primary"
      ghost={true}
      type="button"
      aria-label={expanded ? 'Contract' : 'Expand'}
      aria-expanded={expanded}
      className="usx-layout__expand-button"
      onClick={() => setExpanded((value) => !value)}
    >
      <Icon source="usx" name="expand" size={3} className="usx-layout__expand-icon usx-layout__expand-icon--expand" />
      <Icon source="usx" name="contract" size={3} className="usx-layout__expand-icon usx-layout__expand-icon--contract" />
    </Button>
  ) : null;

  return (
    <div className={classes} {...props}>
      {variant === 'single-column' ? (
        <SingleColumnLayout expandButton={expandButton}>
          {children || content}
        </SingleColumnLayout>
      ) : variant === 'grid' ? (
        <GridLayout
          leftSidebar={leftSidebar}
          rightSidebar={rightSidebar}
          expandLeftSidebar={expandLeftSidebar}
          expandRightSidebar={expandRightSidebar}
          expandButton={expandButton}
        >
          {children || content}
        </GridLayout>
      ) : (
        <>
          {expandButton}
          {children || content}
        </>
      )}
    </div>
  );
}
