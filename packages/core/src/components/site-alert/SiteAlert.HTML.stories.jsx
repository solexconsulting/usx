import React from 'react';
import html from './site-alert.html?raw';

export default {
  title: 'HTML/SiteAlert',
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
