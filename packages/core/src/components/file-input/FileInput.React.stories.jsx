import React from 'react';
import FileInput from './FileInput';
import config from './config.json';

export default {
  title: 'React/FileInput',
  component: FileInput,
};

const Template = (args) => <FileInput {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
