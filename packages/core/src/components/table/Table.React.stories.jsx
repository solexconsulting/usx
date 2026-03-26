import React from 'react';
import Table from './Table';
import config from './config.json';

export default {
  title: 'React/Table',
  component: Table,
};

const Template = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
