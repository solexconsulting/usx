import React from 'react';
import html from './section.html?raw';

export default {
  title: 'HTML/Section',
  tags: ['autodocs'],
};

export const Default = {
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
