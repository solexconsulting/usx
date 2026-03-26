import React from 'react';
import html from './language-selector.html?raw';

export default {
  title: 'HTML/LanguageSelector',
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
