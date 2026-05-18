import React from 'react';
import html from './hero.html?raw';

export default {
  title: 'HTML/Hero',
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
