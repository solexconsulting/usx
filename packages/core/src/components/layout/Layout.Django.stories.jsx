import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Layout',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const SingleColumn = {
  args: {
    variant: 'single-column',
    children: '<div style="padding: 2rem; background: #f0f0f0;"><h2>Single Column Layout</h2><p>This content is centered with responsive gutters.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div>',
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'layout', props: {
          variant: 'single-column',
          children: '<div style="padding: 2rem; background: #f0f0f0;"><h2>Single Column Layout</h2><p>This content is centered with responsive gutters.</p></div>',
        } })
      }
    }
  },
  render: djangoComponent('layout')
};

export const GridFullContent = {
  args: {
    variant: 'grid',
    content: '<div style="padding: 2rem; background: #e8f4f8;"><h2>Grid Layout - Full Content</h2><p>Content spans the full width, sidebars are hidden on mobile.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></div>',
    leftSidebar: '<div style="padding: 1rem; background: #f8e8e8;"><h3>Left Sidebar</h3><p>Navigation or secondary content</p></div>',
    rightSidebar: '<div style="padding: 1rem; background: #e8f8e8;"><h3>Right Sidebar</h3><p>Related links or ads</p></div>',
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'layout', props: {
          variant: 'grid',
          content: '<div style="padding: 2rem; background: #e8f4f8;"><h2>Grid Layout - Full Content</h2><p>Content spans the full width.</p></div>',
          leftSidebar: '<div style="padding: 1rem; background: #f8e8e8;"><h3>Left Sidebar</h3></div>',
          rightSidebar: '<div style="padding: 1rem; background: #e8f8e8;"><h3>Right Sidebar</h3></div>',
        } })
      }
    }
  },
  render: djangoComponent('layout')
};

export const GridWithLeftSidebar = {
  args: {
    variant: 'grid',
    contentModifier: 'right',
    content: '<div style="padding: 2rem; background: #e8f4f8;"><h2>Grid Layout - Content with Left Sidebar</h2><p>Content adjusts to leave space for the left sidebar on desktop.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p></div>',
    leftSidebar: '<nav aria-label="Side navigation" class="usa-sidenav usx-side-nav"><ul class="usa-sidenav"><li class="usa-sidenav__item"><a href="#" class="usa-current">Home</a></li><li class="usa-sidenav__item"><a href="#">About</a></li><li class="usa-sidenav__item"><a href="#">Services</a></li><li class="usa-sidenav__item"><a href="#">Contact</a></li></ul></nav>',
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'layout', props: {
          variant: 'grid',
          contentModifier: 'right',
          content: '<div style="padding: 2rem; background: #e8f4f8;"><h2>Grid Layout - Content with Left Sidebar</h2><p>Content adjusts...</p></div>',
          leftSidebar: '<nav aria-label="Side navigation" class="usa-sidenav usx-side-nav"><ul class="usa-sidenav"><li class="usa-sidenav__item"><a href="#" class="usa-current">Home</a></li>...</ul></nav>',
        } })
      }
    }
  },
  render: djangoComponent('layout')
};

export const GridWithRightSidebar = {
  args: {
    variant: 'grid',
    content: '<div style="padding: 2rem; background: #e8f4f8;"><h2>Grid Layout - Content with Right Sidebar</h2><p>Content adjusts to leave space for the right sidebar on desktop.</p><p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>',
    rightSidebar: '<div style="padding: 1rem; background: #e8f8e8;"><h3>Related Content</h3><ul><li>Related Link 1</li><li>Related Link 2</li><li>Related Link 3</li></ul></div>',
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'layout', props: {
          variant: 'grid',
          content: '<div style="padding: 2rem; background: #e8f4f8;"><h2>Grid Layout - Content with Right Sidebar</h2><p>Content adjusts...</p></div>',
          rightSidebar: '<div style="padding: 1rem; background: #e8f8e8;"><h3>Related Content</h3><ul><li>Related Link 1</li>...</ul></div>',
        } })
      }
    }
  },
  render: djangoComponent('layout')
};
