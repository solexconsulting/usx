import React from 'react';
import SummaryBox from './SummaryBox';
import config from './config.json';

export default {
  title: 'React/SummaryBox',
  component: SummaryBox,
};

const Template = (args) => <SummaryBox {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
