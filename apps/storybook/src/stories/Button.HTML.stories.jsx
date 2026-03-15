import React from 'react';
import buttonHtml from '../../../../packages/core/src/components/button/button.html?raw';

export default {
  title: 'HTML/Button',
  tags: ['autodocs']
};

export const Overview = () => <div dangerouslySetInnerHTML={{ __html: buttonHtml }} />;