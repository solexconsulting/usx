import React from 'react';
import html from './villain.html?raw';

export default {
  title: 'HTML/Villain',
  tags: ['autodocs'],
};

export const AllVariants = {
  name: 'All variants',
  parameters: {
    docs: {
      source: {
        code: html,
      },
    },
  },
  render: () => <div dangerouslySetInnerHTML={{ __html: html }} />,
};
