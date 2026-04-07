import React from 'react';
import Skipnav from './Skipnav';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Skipnav',
  component: Skipnav,
  tags: ['autodocs'],
  argTypes: generatedArgTypes
};

export const Default = {
  args: {
    target: '#custom-target-1',
  },
  render: (args) => (
    <>
      <Skipnav
        {...args}
      />
      Click <button className="usa-button usa-button--unstyled">
        here
      </button> and type "shift + tab" to focus the Skipnav link, then press "enter" to jump to the target content below.

      <div style={{ height: '1200px' }} />

      <div id="custom-target-1" style={{ padding: '24px', background: '#f6f7f8' }}>
        <h2>Storybook Target</h2>
        <p>This is the simulated main content target for the Skipnav link.</p>
      </div>
    </>
  ),
};

export const CustomContent = {
  args: {
    target: 'custom-target-2',
    content: <span className="text-accent-cool-dark">Skip to <strong>main content</strong></span>,
  },
  render: (args) => (
    <>
      <Skipnav
        {...args}
      />
      Click <button className="usa-button usa-button--unstyled">
        here
      </button> and type "shift + tab" to focus the Skipnav link, then press "enter" to jump to the target content below.

      <div style={{ height: '1200px' }} />

      <div id="custom-target-2" style={{ padding: '24px', background: '#f6f7f8' }}>
        <h2>Storybook Target</h2>
        <p>This is the simulated main content target for the Skipnav link.</p>
      </div>
    </>
  ),
};


export const WithChildren = {
  args: {
    target: 'custom-target-3',
    children: <span class="text-secondary">Skip to <strong>main content</strong> with children</span>,
  },
  render: (args) => (
    <>
      <Skipnav {...args}>
        {args.children}
      </Skipnav>
      Click <button className="usa-button usa-button--unstyled">
        here
      </button> and type "shift + tab" to focus the Skipnav link, then press "enter" to jump to the target content below.

      <div style={{ height: '1200px' }} />

      <div id="custom-target-3" style={{ padding: '24px', background: '#f6f7f8' }}>
        <h2>Storybook Target</h2>
        <p>This is the simulated main content target for the Skipnav link.</p>
      </div>
    </>
  )
};
