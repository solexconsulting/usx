import React from 'react';
import Layout from './Layout';
import SideNav from '../sidenav/SideNav';

export default {
  title: 'React/Layout',
  component: Layout,
  tags: ['autodocs'],
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
      <div style={{ background: '#f0f0f0' }}>
        <h2>Single Column Layout</h2>
        <p>This content is centered with responsive gutters.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    ),
  },
  GridFullContent: {
    variant: 'grid',
    content: (
      <div style={{ background: '#e8f4f8' }}>
        <h2>Grid Layout - Full Content</h2>
        <p>Content spans the full width, sidebars are hidden on mobile.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    ),
    leftSidebar: (
      <div style={{ background: '#f8e8e8' }}>
        <h3>Left Sidebar</h3>
        <p>Navigation or secondary content</p>
      </div>
    ),
    rightSidebar: (
      <div style={{ background: '#e8f8e8' }}>
        <h3>Right Sidebar</h3>
        <p>Related links or ads</p>
      </div>
    ),
  },
  GridWithLeftSidebar: {
    variant: 'grid',
    content: (
      <div style={{ background: '#e8f4f8' }}>
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
      <div style={{ background: '#e8f4f8' }}>
        <h2>Grid Layout - Content with Right Sidebar</h2>
        <p>Content adjusts to leave space for the right sidebar on desktop.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    ),
    rightSidebar: (
      <div style={{ padding: '1rem', background: '#e8f8e8' }}>
        <h3>Related Content</h3>
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
export const GridWithLeftSidebar = { args: storyDefs.GridWithLeftSidebar };
export const GridWithRightSidebar = { args: storyDefs.GridWithRightSidebar };
