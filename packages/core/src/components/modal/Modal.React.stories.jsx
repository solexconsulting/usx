import React from 'react';
import Modal from './Modal';
import config from './config.json';

export default {
  title: 'React/Modal',
  component: Modal,
};

const Template = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
