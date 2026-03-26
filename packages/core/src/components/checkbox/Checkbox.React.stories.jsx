import React from 'react';
import Checkbox from './Checkbox';
import config from './config.json';

export default {
  title: 'React/Checkbox',
  component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
