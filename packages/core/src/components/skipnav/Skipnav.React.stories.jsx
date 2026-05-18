import React from 'react';
import Skipnav from './Skipnav';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Skipnav',
  component: Skipnav,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    target: '#custom-target-1',
  },
  CustomContent: {
    target: 'custom-target-2',
    content: <span className="text-accent-cool-dark">Skip to <strong>main content</strong></span>,
  },
  WithChildren: {
    target: 'custom-target-3',
    children: <span className="text-secondary">Skip to <strong>main content</strong> with children</span>,
  },
};

const renderWithTarget = (args, targetId) => (
  <>
    <Skipnav {...args}>{args.children}</Skipnav>
    Click <button className="usa-button usa-button--unstyled">
      here
    </button> and type "shift + tab" to focus the Skipnav link, then press "enter" to jump to the target content below.

    <div style={{ height: '1200px' }} />

    <div id={targetId} style={{ padding: '24px', background: '#f6f7f8' }}>
      <h2>Storybook Target</h2>
      <p>This is the simulated main content target for the Skipnav link.</p>
    </div>
  </>
);

export const Default = {
  args: storyDefs.Default,
  render: (args) => renderWithTarget(args, 'custom-target-1'),
};

export const CustomContent = {
  args: storyDefs.CustomContent,
  render: (args) => renderWithTarget(args, 'custom-target-2'),
};

export const WithChildren = {
  args: storyDefs.WithChildren,
  render: (args) => renderWithTarget(args, 'custom-target-3'),
};
