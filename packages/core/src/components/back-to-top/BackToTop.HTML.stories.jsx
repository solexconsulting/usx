import React from 'react';
import html from './back-to-top.html?raw';

export default {
  title: 'HTML/BackToTop',
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
