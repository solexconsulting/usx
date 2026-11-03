import React from 'react';
import Workbench from './django-workbench/Workbench.jsx';
import './django-workbench.css';

export default {
  title: 'Documentation/USX Django/Workbench',
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  name: 'Editor',
  render: () => <Workbench />
};
