import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './layout.scss';

// ── Sub-components ──────────────────────────────────────────────────────────

function SingleColumnLayout({ children, className = '', ...props }) {
  const classes = ['usx-layout__single-column', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

SingleColumnLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

function GridLayout({
  content,
  leftSidebar,
  rightSidebar,
  expandLeftSidebar,
  expandRightSidebar,
  className = '',
  ...props
}) {
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
        <aside className={leftSidebarClasses}>
          {leftSidebar}
        </aside>
      )}
      <main className={contentClasses}>
        {content}
      </main>
      {rightSidebar && (
        <aside className={rightSidebarClasses}>
          {rightSidebar}
        </aside>
      )}
    </div>
  );
}

GridLayout.propTypes = {
  content: PropTypes.node.isRequired,
  leftSidebar: PropTypes.node,
  rightSidebar: PropTypes.node,
  expandLeftSidebar: PropTypes.bool,
  expandRightSidebar: PropTypes.bool,
  className: PropTypes.string,
};

// ── Main Layout ─────────────────────────────────────────────────────────────

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
}) {
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
          content={content || children}
          leftSidebar={leftSidebar}
          rightSidebar={rightSidebar}
          expandLeftSidebar={expandLeftSidebar}
          expandRightSidebar={expandRightSidebar}
        />
      ) : (
        children || content
      )}
    </div>
  );
}

Layout.propTypes = {
  variant: PropTypes.oneOf(['single-column', 'grid']),
  children: PropTypes.node,
  content: PropTypes.node,
  leftSidebar: PropTypes.node,
  rightSidebar: PropTypes.node,
  expandLeftSidebar: PropTypes.bool,
  expandRightSidebar: PropTypes.bool,
  className: PropTypes.string,
};

// ── Exports ─────────────────────────────────────────────────────────────────

export { SingleColumnLayout, GridLayout };
