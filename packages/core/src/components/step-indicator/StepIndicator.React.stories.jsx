import React from 'react';
import StepIndicator from './StepIndicator';
import config from './config.json';

export default {
  title: 'React/StepIndicator',
  component: StepIndicator,
};

const Template = (args) => <StepIndicator {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
