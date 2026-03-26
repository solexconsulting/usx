import React from 'react';
import InPageNav from './InPageNav';
import config from './config.json';

export default {
  title: 'React/InPageNav',
  component: InPageNav,
};

const Template = (args) => <InPageNav {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
