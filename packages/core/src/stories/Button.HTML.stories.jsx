import React from 'react';
import buttonHtml from '../components/button/button.html?raw';

export default {
  title: 'HTML/Button',
  tags: ['autodocs']
};

export const Overview = () => <div dangerouslySetInnerHTML={{ __html: buttonHtml }} />;