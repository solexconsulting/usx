import React from 'react';
import html from './copy-to-clipboard.html?raw';

export default {
  title: 'HTML/CopyToClipboard',
  tags: ['autodocs'],
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: html
      }
    }
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
}
