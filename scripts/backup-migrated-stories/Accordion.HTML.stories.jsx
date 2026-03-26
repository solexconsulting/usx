import React from 'react';
import html from '../components/accordion/accordion.html?raw';

export default {
  title: 'HTML/Accordion',
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
