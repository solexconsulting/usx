import React from 'react';
import inputHtml from '../../../../packages/core/src/components/input/input.html?raw';

export default {
  title: 'HTML/Input',
  tags: ['autodocs']
};

export const Overview = () => <div dangerouslySetInnerHTML={{ __html: inputHtml }} />;