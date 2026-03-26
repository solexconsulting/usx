import React from 'react';
import MemorableDate from './MemorableDate';
import config from './config.json';

export default {
  title: 'React/MemorableDate',
  component: MemorableDate,
};

const Template = (args) => <MemorableDate {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
