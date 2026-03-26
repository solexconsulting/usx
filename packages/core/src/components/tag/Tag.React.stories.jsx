import React from 'react';
import Tag from './Tag';
import config from './config.json';

export default {
  title: 'React/Tag',
  component: Tag,
};

const Template = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
