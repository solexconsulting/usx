import React from 'react';
import MemorableDate from '../../../../core/src/components/memorable-date/MemorableDate.jsx';
import config from '../../../../core/src/components/memorable-date/config.json';

export default {
  tags: ['USWDS'],
  title: 'React/USWDS/MemorableDate',
  component: MemorableDate,
};

const Template = (args) => <MemorableDate {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
