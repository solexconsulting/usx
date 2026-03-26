import React from 'react';
import Collection from './Collection';
import config from './config.json';

export default {
  title: 'React/Collection',
  component: Collection,
};

const Template = (args) => <Collection {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
