import React from 'react';
import html from './summary-box.html?raw';

export default {
  title: 'HTML/SummaryBox',
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
