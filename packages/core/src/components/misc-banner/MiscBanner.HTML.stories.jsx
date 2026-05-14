import React from 'react';
import html from './misc-banner.html?raw';

export default {
  title: 'HTML/MiscBanner',
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
