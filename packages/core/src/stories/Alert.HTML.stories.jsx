import React from 'react';
import alertHtml from '../components/alert/alert.html?raw';

export default {
  title: 'HTML/Alert',
  tags: ['autodocs']
};

export const Overview = () => <div dangerouslySetInnerHTML={{ __html: alertHtml }} />;
