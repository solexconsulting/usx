import React from 'react';
import html from './memorable-date.html?raw';

export default {
  title: 'HTML/MemorableDate',
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
