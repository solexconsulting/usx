import React from 'react';
import Layout from '../../../../usx-react/src/components/layout/Layout.tsx';
import Page from '../../../../usx-react/src/components/page/Page.tsx';
import SideNav from '../../../../usx-react/src/components/sidenav/SideNav.tsx';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';
import { expect, userEvent, waitFor } from 'storybook/test';

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
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    ),
  },
  GridFullContent: {
    variant: 'grid',
    content: (
      <div className="bg-blue">
        <h2>Grid Layout - Full Content</h2>
        <p>Content spans the full width, sidebars are hidden on mobile.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
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
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
        <p>Use the expand button in the top-right corner to grow the layout to a wider max-width.</p>
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
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
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
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
export const Expandable = {
  args: storyDefs.Expandable,
  play: async ({ canvas, canvasElement }) => {
    const layout = canvasElement.querySelector('.usx-layout');
    const button = layout.querySelector('.usx-layout__expand-button');

    await expect(layout).not.toHaveClass('usx-expanded');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    if (getComputedStyle(button).display === 'none') return;

    await userEvent.click(button);

    await expect(layout).toHaveClass('usx-expanded');
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByRole('button', { name: /contract/i })).toBe(button);

    await userEvent.click(button);

    await expect(layout).not.toHaveClass('usx-expanded');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  },
};
export const ExpandableGridFullContent = { args: storyDefs.ExpandableGridFullContent };
export const ExpandableGridWithLeftSidebar = { args: storyDefs.ExpandableGridWithLeftSidebar };
export const ExpandableGridWithRightSidebar = { args: storyDefs.ExpandableGridWithRightSidebar };

export const VerticalSpacing = {
  render: () => (
    <>
      <Alert
        heading="Position of Expand/Collapse button"
        variant="info"
      >
        <div className="maxw-tablet">
          The Expand/Collapse button (not visible on small screens) is always 3.5 units from the top, and 5 units from the right of the usx-layout component's boundary.
          It remains consistently positioned regardless of the heading margin and/or layout type (single-column or grid).
        </div>
      </Alert>
      <div>
        {[
          { name: 'heading', content: <h1 className="bg-surface-1">H1 Page heading</h1> },
          { name: 'wrapped-heading', content: <div className="bg-surface-1"><h2>H2 Section heading</h2><p>Section content.</p></div> },
          { name: 'page', content: <Page element="section" title="H1 Page heading" className="bg-surface-1"><div className="usa-prose"><h2>H2 Section heading</h2><p>Page content.</p></div></Page> },
        ].map(({ name, content }) => (
          <section key={name} data-spacing-case={name}>
            {['single-column', 'grid'].map(variant => (
              <Layout key={variant} variant={variant} expandable className="margin-y-2 bg-surface-2">{content}</Layout>
            ))}
          </section>
        ))}
      </div>
    </> 
  ),
  play: async ({ canvasElement }) => {
    for (const example of canvasElement.querySelectorAll('[data-spacing-case]')) {
      const layouts = [...example.querySelectorAll('.usx-layout')];
      const measurements = layouts.map(layout => {
        const container = layout.querySelector('.usx-layout__single-column, .usx-layout__content');
        const bounds = container.getBoundingClientRect();
        const button = container.querySelector('.usx-layout__expand-button');
        return {
          height: bounds.height,
          headingOffsets: [...container.querySelectorAll('h1, h2')].map(heading => heading.getBoundingClientRect().top - bounds.top),
          buttonOffset: getComputedStyle(button).display === 'none' ? null : button.getBoundingClientRect().top - bounds.top,
        };
      });
      await expect(measurements[1].height).toBeCloseTo(measurements[0].height, 0);
      await expect(measurements[1].headingOffsets).toEqual(measurements[0].headingOffsets);
      await expect(measurements[1].buttonOffset).toBe(measurements[0].buttonOffset);
    }
  },
};

const renderComparison = (args) => (
  <div style={args.style}>
    <Layout expandable className={`${args.className}`}>
      <div data-layout-content className="bg-blue height-15"><h2>Single column</h2><p>Content with shared responsive gutters.</p></div>
    </Layout>
    {[[], ['left'], ['right'], ['left', 'right']].map((sidebars) => (
      <Layout
        key={sidebars.join('-') || 'none'}
        variant="grid"
        expandable
        className={`margin-top-3 ${args.className}`}
        leftSidebar={sidebars.includes('left') ? <div className="bg-violet height-full"><h2>Left sidebar</h2></div> : null}
        rightSidebar={sidebars.includes('right') ? <div className="bg-cyan height-full"><h2>Right sidebar</h2></div> : null}
      >
        <div data-layout-content className="bg-blue height-full"><h2>Grid: {sidebars.join(' and ') || 'no sidebars'}</h2><p>Content with shared responsive gutters.</p></div>
      </Layout>
    ))}
  </div>
);

const checkComparison = async ({ canvasElement, args = {} }) => {
  const layouts = [...canvasElement.querySelectorAll('.usx-layout')];
  const single = layouts[0].querySelector('[data-layout-content]').getBoundingClientRect();
  const gutter = parseFloat(getComputedStyle(layouts[0]).paddingLeft);
  const availableWidth = layouts[0].getBoundingClientRect().width - 2 * gutter;
  const rootFontSize = parseFloat(getComputedStyle(canvasElement.ownerDocument.documentElement).fontSize);
  const compact = args.className === 'usx-layout--compact';
  const collapsedMaximum = (compact ? 40 : 64) * rootFontSize;
  const expandedMaximum = (compact ? 72 : 100) * rootFontSize;
  const minimumContentWidth = 32 * rootFontSize;
  const expectedSidebarWidth = (compact ? 12 : 16) * rootFontSize;
  const largeGutter = compact ? 2.5 * rootFontSize : 32;
  for (const layout of layouts) {
    const sidebars = [...layout.querySelectorAll('aside')];
    const sidebarsFit = availableWidth >= Math.min(collapsedMaximum, minimumContentWidth) + sidebars.length * expectedSidebarWidth;
    await waitFor(() => expect(sidebars.filter(sidebar => getComputedStyle(sidebar).display !== 'none').length).toBe(sidebarsFit ? sidebars.length : 0));
    const content = layout.querySelector('[data-layout-content]').getBoundingClientRect();
    const container = layout.querySelector('.usx-layout__grid-container, .usx-layout__single-column');
    const containerBounds = container.getBoundingClientRect();
    const bounds = layout.getBoundingClientRect();
    const visibleSidebars = sidebars.filter(sidebar => getComputedStyle(sidebar).display !== 'none');
    const availableContentWidth = availableWidth - visibleSidebars.reduce((total, sidebar) => total + sidebar.getBoundingClientRect().width, 0);
    const contentMaximum = Math.max(0, (layout.classList.contains('usx-expanded') ? expandedMaximum : collapsedMaximum) - 2 * gutter);
    await expect(content.width).toBeCloseTo(Math.min(contentMaximum, availableContentWidth), 0);
    const canToggle = Math.min(availableContentWidth, Math.max(0, expandedMaximum - 2 * gutter)) - Math.min(availableContentWidth, Math.max(0, collapsedMaximum - 2 * gutter)) > 1;
    const button = layout.querySelector('.usx-layout__expand-button');
    await waitFor(() => expect(getComputedStyle(button).display !== 'none').toBe(canToggle));
    for (const sidebar of visibleSidebars) {
      await expect(sidebar.getBoundingClientRect().width).toBeCloseTo(expectedSidebarWidth, 0);
      const left = sidebar.classList.contains('usx-layout__sidebar--left');
      await expect(parseFloat(getComputedStyle(sidebar)[left ? 'paddingRight' : 'paddingLeft'])).toBe(largeGutter);
      await expect(parseFloat(getComputedStyle(sidebar)[left ? 'paddingLeft' : 'paddingRight'])).toBe(0);
    }
    await expect(layout.querySelector('.usx-layout__expand-button')).toHaveAttribute('aria-expanded', String(layout.classList.contains('usx-expanded')));
    await expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
    await expect(Math.abs((containerBounds.left - bounds.left) - (bounds.right - containerBounds.right))).toBeLessThanOrEqual(1);
    const contentContainer = layout.querySelector('.usx-layout__content, .usx-layout__single-column');
    await expect(parseFloat(getComputedStyle(layout).paddingLeft)).toBe(gutter);
    await expect(parseFloat(getComputedStyle(layout).paddingRight)).toBe(gutter);
    await expect(parseFloat(getComputedStyle(contentContainer).paddingLeft)).toBe(0);
    await expect(parseFloat(getComputedStyle(contentContainer).paddingRight)).toBe(0);
    if (!visibleSidebars.length) {
      await expect(Math.abs(content.left - single.left)).toBeLessThanOrEqual(1);
      await expect(Math.abs(content.width - single.width)).toBeLessThanOrEqual(1);
    } else {
      const sidebarWidth = visibleSidebars.reduce((total, sidebar) => total + sidebar.getBoundingClientRect().width, 0);
      await expect(content.width).toBeCloseTo(Math.min(contentMaximum, availableWidth - sidebarWidth), 0);
      const largestSidebar = Math.max(...visibleSidebars.map(sidebar => sidebar.getBoundingClientRect().width));
      if (availableWidth >= contentMaximum + 2 * largestSidebar) {
        await expect(Math.abs(content.left - single.left)).toBeLessThanOrEqual(1);
        await expect(Math.abs(content.right - single.right)).toBeLessThanOrEqual(1);
      }
      if (availableWidth <= contentMaximum + sidebarWidth) {
        const items = [contentContainer, ...visibleSidebars].map(item => item.getBoundingClientRect());
        await expect(Math.abs(Math.min(...items.map(item => item.left)) - bounds.left - gutter)).toBeLessThanOrEqual(1);
        await expect(Math.abs(Math.max(...items.map(item => item.right)) - bounds.right + gutter)).toBeLessThanOrEqual(1);
      }
    }
  }
};

export const ResponsivenessAndAvailability = {
  render: renderComparison,
  play: async (context) => {
    await checkComparison(context);
    for (const layout of context.canvasElement.querySelectorAll('.usx-layout')) {
      const button = layout.querySelector('.usx-layout__expand-button');
      if (getComputedStyle(button).display === 'none') continue;
      const content = layout.querySelector('[data-layout-content]');
      const collapsedWidth = content.getBoundingClientRect().width;
      await userEvent.click(button);
      await waitFor(() => expect(content.getBoundingClientRect().width - collapsedWidth).toBeGreaterThan(1));
      await expect(button).toBeVisible();
      await expect(button).toHaveAttribute('aria-expanded', 'true');
      await userEvent.click(button);
      await waitFor(() => expect(content.getBoundingClientRect().width).toBeCloseTo(collapsedWidth, 0));
      await expect(button).toHaveAttribute('aria-expanded', 'false');
    }
  },
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
