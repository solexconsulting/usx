import React from 'react';
import html from './breadcrumb.html?raw';

export default {
  title: 'HTML/Breadcrumb',
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
