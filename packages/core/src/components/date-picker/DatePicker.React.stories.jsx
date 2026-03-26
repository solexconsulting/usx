import React from 'react';
import DatePicker from './DatePicker';
import config from './config.json';

export default {
  title: 'React/DatePicker',
  component: DatePicker,
};

const Template = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
