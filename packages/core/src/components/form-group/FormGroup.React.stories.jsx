import React from 'react';
import FormGroup from './FormGroup';
import config from './config.json';

export default {
  title: 'React/FormGroup',
  component: FormGroup,
};

const Template = (args) => <FormGroup {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
