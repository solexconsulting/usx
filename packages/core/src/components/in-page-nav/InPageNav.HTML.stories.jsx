import React from 'react';
import html from './in-page-nav.html?raw';

export default {
  title: 'HTML/InPageNav',
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
