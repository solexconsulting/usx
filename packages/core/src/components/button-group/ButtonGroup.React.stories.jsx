import React from 'react';
import ButtonGroup from './ButtonGroup';
import config from './config.json';

export default {
  title: 'React/ButtonGroup',
  component: ButtonGroup,
};

const Template = (args) => <ButtonGroup {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
