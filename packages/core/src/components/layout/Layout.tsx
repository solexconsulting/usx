import React, { ReactNode, HTMLAttributes } from 'react';
import ClassNames from 'classnames';
import './layout.scss';

// ── Sub-components ──────────────────────────────────────────────────────────

export interface SingleColumnLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export function SingleColumnLayout({ children, className = '', ...props }: SingleColumnLayoutProps) {
  const classes = ['usx-layout__single-column', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export type GridLayoutProps = {
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
  expandLeftSidebar?: boolean;
  expandRightSidebar?: boolean;
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function GridLayout({
  leftSidebar,
  rightSidebar,
  expandLeftSidebar,
  expandRightSidebar,
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
      <main className={contentClasses}>{children}</main>
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
  className = '',
  ...props
}: LayoutProps) {
  const classes = ClassNames(
    'usx-layout',
    className,
  );

  return (
    <div className={classes} {...props}>
      {variant === 'single-column' ? (
        <SingleColumnLayout>
          {children || content}
        </SingleColumnLayout>
      ) : variant === 'grid' ? (
        <GridLayout
          leftSidebar={leftSidebar}
          rightSidebar={rightSidebar}
          expandLeftSidebar={expandLeftSidebar}
          expandRightSidebar={expandRightSidebar}
        >
          {children || content}
        </GridLayout>
      ) : (
        children || content
      )}
    </div>
  );
}
