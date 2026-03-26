import React from 'react';
import ProcessList from './ProcessList';
import config from './config.json';

export default {
  title: 'React/ProcessList',
  component: ProcessList,
};

const Template = (args) => <ProcessList {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
