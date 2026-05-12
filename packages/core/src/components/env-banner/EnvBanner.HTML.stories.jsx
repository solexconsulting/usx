import React from 'react';
import html from './env-banner.html?raw';

export default {
  title: 'HTML/EnvBanner',
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
