import React from 'react';
import FileInput from '../../../../core/src/components/file-input/FileInput.jsx';
import config from '../../../../core/src/components/file-input/config.json';

export default {
  tags: ['USWDS'],
  title: 'React/USWDS/FileInput',
  component: FileInput,
};

const Template = (args) => <FileInput {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
