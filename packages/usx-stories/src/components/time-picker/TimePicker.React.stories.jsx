import React from 'react';
import TimePicker from '../../../../core/src/components/time-picker/TimePicker.jsx';
import config from '../../../../core/src/components/time-picker/config.json';

export default {
  tags: ['USWDS'],
  title: 'React/USWDS/TimePicker',
  component: TimePicker,
};

const Template = (args) => <TimePicker {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
