import React from 'react';
import inputHtml from '../components/input/input.html?raw';

export default {
  title: 'HTML/Input',
  tags: ['autodocs'],
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: inputHtml
      }
    }
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: inputHtml }} />;
  }
}
