import React from 'react';
import Pagination from './Pagination';
import config from './config.json';

export default {
  title: 'React/Pagination',
  component: Pagination,
};

const Template = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
