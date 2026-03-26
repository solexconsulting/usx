import React from 'react';
import TimePicker from './TimePicker';
import config from './config.json';

export default {
  title: 'React/TimePicker',
  component: TimePicker,
};

const Template = (args) => <TimePicker {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
