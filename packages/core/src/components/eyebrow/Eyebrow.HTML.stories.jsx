import React from 'react';
import html from './eyebrow.html?raw';

export default {
  title: 'HTML/Eyebrow',
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
