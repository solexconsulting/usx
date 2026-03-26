import React from 'react';
import Tooltip from './Tooltip';
import config from './config.json';

export default {
  title: 'React/Tooltip',
  component: Tooltip,
};

const Template = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
