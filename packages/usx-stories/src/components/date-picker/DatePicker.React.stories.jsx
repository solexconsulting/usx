import React from 'react';
import DatePicker from '../../../../core/src/components/date-picker/DatePicker.jsx';
import config from '../../../../core/src/components/date-picker/config.json';

export default {
  tags: ['USWDS'],
  title: 'React/USWDS/DatePicker',
  component: DatePicker,
};

const Template = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
