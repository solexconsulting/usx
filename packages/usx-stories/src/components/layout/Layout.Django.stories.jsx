import React from 'react';
import config from '../../../../usx-react/src/components/layout/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { djangoComponent, useDjangoRenderedHtml } from '../../utils/djangoComponent.js';
import { storyDefs } from './Layout.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USX/Layout',
  tags: ['USX', 'autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'layout' });

export const SingleColumn = createStory(storyDefs.SingleColumn);
export const GridFullContent = createStory(storyDefs.GridFullContent);
export const GridWithoutSidebars = createStory({ ...storyDefs.SingleColumn, variant: 'grid' });
export const GridWithLeftSidebar = createStory(storyDefs.GridWithLeftSidebar);
export const GridWithRightSidebar = createStory(storyDefs.GridWithRightSidebar);
export const Expandable = createStory(storyDefs.Expandable);
export const ExpandableGridFullContent = createStory(storyDefs.ExpandableGridFullContent);
export const ExpandableGridWithLeftSidebar = createStory(storyDefs.ExpandableGridWithLeftSidebar);
export const ExpandableGridWithRightSidebar = createStory(storyDefs.ExpandableGridWithRightSidebar);

const DjangoLayout = djangoComponent({ componentName: 'layout' });
const DjangoAlert = djangoComponent({ componentName: 'alert' });

// Page renders in Django first, so the layout wraps its markup rather than a React copy.
const PageInLayout = ({ variant }) => {
  const { html } = useDjangoRenderedHtml('page', {
    as: 'section',
    title: 'H1 Page heading',
    className: 'bg-surface-1',
    children: (
      <div className="usa-prose">
        <h2>H2 Section heading</h2>
        <p>Page content.</p>
      </div>
    ),
  });
  return html ? (
    <DjangoLayout variant={variant} expandable className="margin-y-2 bg-surface-2">
      {html}
    </DjangoLayout>
  ) : null;
};

const spacingCases = [
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
  { name: 'page' },
];

export const VerticalSpacing = {
  render: () => (
    <>
      <DjangoAlert heading="Position of Expand/Collapse button" variant="info">
        <div className="maxw-tablet">
          The Expand/Collapse button (not visible on small screens) is always 3.5 units from the
          top, and 5 units from the right of the usx-layout component's boundary. It remains
          consistently positioned regardless of the heading margin and/or layout type (single-column
          or grid).
        </div>
      </DjangoAlert>
      <div>
        {spacingCases.map(({ name, content }) => (
          <section key={name} data-spacing-case={name}>
            {['single-column', 'grid'].map((variant) =>
              content ? (
                <DjangoLayout
                  key={variant}
                  variant={variant}
                  expandable
                  className="margin-y-2 bg-surface-2"
                >
                  {content}
                </DjangoLayout>
              ) : (
                <PageInLayout key={variant} variant={variant} />
              )
            )}
          </section>
        ))}
      </div>
    </>
  ),
};

const sidebarBox = (side, color) => (
  <div className={`${color} height-full`}>
    <h2>{side} sidebar</h2>
  </div>
);

const renderComparison = (args) => (
  <div style={args.style}>
    <DjangoLayout variant="single-column" expandable className={args.className}>
      <div data-layout-content className="bg-blue height-15">
        <h2>Single column</h2>
        <p>Content with shared responsive gutters.</p>
      </div>
    </DjangoLayout>
    {[[], ['left'], ['right'], ['left', 'right']].map((sidebars) => (
      <DjangoLayout
        key={sidebars.join('-') || 'none'}
        variant="grid"
        expandable
        className={`margin-top-3 ${args.className ?? ''}`}
        leftSidebar={sidebars.includes('left') ? sidebarBox('Left', 'bg-violet') : null}
        rightSidebar={sidebars.includes('right') ? sidebarBox('Right', 'bg-cyan') : null}
      >
        <div data-layout-content className="bg-blue height-full">
          <h2>Grid: {sidebars.join(' and ') || 'no sidebars'}</h2>
          <p>Content with shared responsive gutters.</p>
        </div>
      </DjangoLayout>
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
