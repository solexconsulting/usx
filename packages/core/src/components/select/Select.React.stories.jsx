import React from 'react';
import Select from './Select';
import config from './config.json';

export default {
  title: 'React/Select',
  component: Select,
};

const Template = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
