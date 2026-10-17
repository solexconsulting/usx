import React from 'react';
import Layout from '../../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../../usx-react/src/components/page/Page.tsx';
import SideNav from '../../../../usx-react/src/components/sidenav/SideNav.tsx';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';

export default {
  title: 'React/USX/Layout',
  component: Layout,
  tags: ['USX', 'autodocs'],
  parameters: { layout: 'fullscreen' },
  excludeStories: ['storyDefs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['single-column', 'grid'],
    },
  },
};

export const storyDefs = {
  SingleColumn: {
    variant: 'single-column',
    children: (
      <div className="bg-blue">
        <h2>Single Column Layout</h2>
        <p>This content is centered with responsive gutters.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>
    ),
  },
  GridFullContent: {
    variant: 'grid',
    content: (
      <div className="bg-blue">
        <h2>Grid Layout - Full Content</h2>
        <p>Content spans the full width, sidebars are hidden on mobile.</p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </div>
    ),
    leftSidebar: (
      <div className="bg-violet">
        <h2>Left Sidebar</h2>
        <p>Navigation or secondary content</p>
      </div>
    ),
    rightSidebar: (
      <div className="bg-cyan">
        <h2>Right Sidebar</h2>
        <p>Related links or ads</p>
      </div>
    ),
  },
  GridWithLeftSidebar: {
    variant: 'grid',
    content: (
      <div className="bg-blue">
        <h2>Grid Layout - Content with Left Sidebar</h2>
        <p>Content adjusts to leave space for the left sidebar on desktop.</p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur.
        </p>
      </div>
    ),
    leftSidebar: (
      <SideNav
        items={[
          { text: 'Home', href: '#', current: true },
          { text: 'About', href: '#' },
          { text: 'Services', href: '#' },
          { text: 'Contact', href: '#' },
        ]}
      />
    ),
  },
  GridWithRightSidebar: {
    variant: 'grid',
    content: (
      <div className="bg-blue">
        <h2>Grid Layout - Content with Right Sidebar</h2>
        <p>Content adjusts to leave space for the right sidebar on desktop.</p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </p>
      </div>
    ),
    rightSidebar: (
      <div className="bg-cyan">
        <h2>Related Content</h2>
        <ul>
          <li>Related Link 1</li>
          <li>Related Link 2</li>
          <li>Related Link 3</li>
        </ul>
      </div>
    ),
  },
  Expandable: {
    variant: 'single-column',
    expandable: true,
    children: (
      <div className="bg-blue">
        <h2>Expandable Layout</h2>
        <p>
          Use the expand button in the top-right corner to grow the layout to a wider max-width.
        </p>
      </div>
    ),
  },
  ExpandableGridFullContent: {
    variant: 'grid',
    expandable: true,
    content: (
      <div className="bg-blue">
        <h2>Grid Layout - Full Content</h2>
        <p>Content spans the full width, sidebars are hidden on mobile.</p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </div>
    ),
    leftSidebar: (
      <div className="bg-violet">
        <h2>Left Sidebar</h2>
        <p>Navigation or secondary content</p>
      </div>
    ),
    rightSidebar: (
      <div className="bg-cyan">
        <h2>Right Sidebar</h2>
        <p>Related links or ads</p>
      </div>
    ),
  },
  ExpandableGridWithLeftSidebar: {
    variant: 'grid',
    expandable: true,
    content: (
      <div className="bg-blue">
        <h2>Grid Layout - Content with Left Sidebar</h2>
        <p>Content adjusts to leave space for the left sidebar on desktop.</p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur.
        </p>
      </div>
    ),
    leftSidebar: (
      <SideNav
        items={[
          { text: 'Home', href: '#', current: true },
          { text: 'About', href: '#' },
          { text: 'Services', href: '#' },
          { text: 'Contact', href: '#' },
        ]}
      />
    ),
  },
  ExpandableGridWithRightSidebar: {
    variant: 'grid',
    expandable: true,
    content: (
      <div className="bg-blue">
        <h2>Grid Layout - Content with Right Sidebar</h2>
        <p>Content adjusts to leave space for the right sidebar on desktop.</p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </p>
      </div>
    ),
    rightSidebar: (
      <div className="bg-cyan">
        <h2>Related Content</h2>
        <ul>
          <li>Related Link 1</li>
          <li>Related Link 2</li>
          <li>Related Link 3</li>
        </ul>
      </div>
    ),
  },
};

export const SingleColumn = { args: storyDefs.SingleColumn };
export const GridFullContent = { args: storyDefs.GridFullContent };
export const GridWithoutSidebars = { args: { ...storyDefs.SingleColumn, variant: 'grid' } };
export const GridWithLeftSidebar = { args: storyDefs.GridWithLeftSidebar };
export const GridWithRightSidebar = { args: storyDefs.GridWithRightSidebar };
export const Expandable = { args: storyDefs.Expandable };
export const ExpandableGridFullContent = { args: storyDefs.ExpandableGridFullContent };
export const ExpandableGridWithLeftSidebar = { args: storyDefs.ExpandableGridWithLeftSidebar };
export const ExpandableGridWithRightSidebar = { args: storyDefs.ExpandableGridWithRightSidebar };

export const VerticalSpacing = {
  render: () => (
    <>
      <Alert heading="Position of Expand/Collapse button" variant="info">
        <div className="maxw-tablet">
          The Expand/Collapse button (not visible on small screens) is always 3.5 units from the
          top, and 5 units from the right of the usx-layout component's boundary. It remains
          consistently positioned regardless of the heading margin and/or layout type (single-column
          or grid).
        </div>
      </Alert>
      <div>
        {[
          { name: 'heading', content: <h1 className="bg-surface-1">H1 Page heading</h1> },
          {
            name: 'wrapped-heading',
            content: (
              <div className="bg-surface-1">
                <h2>H2 Section heading</h2>
                <p>Section content.</p>
              </div>
            ),
          },
          {
            name: 'page',
            content: (
              <Page element="section" title="H1 Page heading" className="bg-surface-1">
                <div className="usa-prose">
                  <h2>H2 Section heading</h2>
                  <p>Page content.</p>
                </div>
              </Page>
            ),
          },
        ].map(({ name, content }) => (
          <section key={name} data-spacing-case={name}>
            {['single-column', 'grid'].map((variant) => (
              <Layout
                key={variant}
                variant={variant}
                expandable
                className="margin-y-2 bg-surface-2"
              >
                {content}
              </Layout>
            ))}
          </section>
        ))}
      </div>
    </>
  ),
};

const renderComparison = (args) => (
  <div style={args.style}>
    <Layout expandable className={`${args.className}`}>
      <div data-layout-content className="bg-blue height-15">
        <h2>Single column</h2>
        <p>Content with shared responsive gutters.</p>
      </div>
    </Layout>
    {[[], ['left'], ['right'], ['left', 'right']].map((sidebars) => (
      <Layout
        key={sidebars.join('-') || 'none'}
        variant="grid"
        expandable
        className={`margin-top-3 ${args.className}`}
        leftSidebar={
          sidebars.includes('left') ? (
            <div className="bg-violet height-full">
              <h2>Left sidebar</h2>
            </div>
          ) : null
        }
        rightSidebar={
          sidebars.includes('right') ? (
            <div className="bg-cyan height-full">
              <h2>Right sidebar</h2>
            </div>
          ) : null
        }
      >
        <div data-layout-content className="bg-blue height-full">
          <h2>Grid: {sidebars.join(' and ') || 'no sidebars'}</h2>
          <p>Content with shared responsive gutters.</p>
        </div>
      </Layout>
    ))}
  </div>
);

export const ResponsivenessAndAvailability = {
  render: renderComparison,
};

export const ThemedComparison = {
  ...ResponsivenessAndAvailability,
  args: {
    className: 'usx-layout--compact',
    style: {
      '--usx-layout-gutter-mobile': '1rem',
      '--usx-layout-gutter': '2.5rem',
    },
  },
};
