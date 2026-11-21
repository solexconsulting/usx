import React from 'react';
import Component from '../../../../../../usx-react/src/components/chat-context/ChatContext';
import config from '../../../../../../usx-react/src/components/chat-context/config.json';
import { buildArgTypes } from '../../../../utils/storyHelpers.jsx';
export const storyDefs = {
  Default: { label: 'Listing', title: 'Bicycle', description: 'Available for pickup' },
  Linked: { label: 'Request', title: 'Access request', href: '#example-access-request' },
};
export default {
  title: 'React/USX/Chat/Context',
  component: Component,
  excludeStories: ['storyDefs'],
  argTypes: buildArgTypes(config.props),
};
export const Default = { args: storyDefs.Default, render: (args) => <Component {...args} /> };
export const Linked = {
  args: storyDefs.Linked,
  render: (args) => (
    <div>
      <Component {...args} />
      <section id="example-access-request" tabIndex={-1}>
        <h3>Access request</h3>
        <p>
          Your request is awaiting approval from the project owner. No additional documents are
          required.
        </p>
      </section>
    </div>
  ),
};
