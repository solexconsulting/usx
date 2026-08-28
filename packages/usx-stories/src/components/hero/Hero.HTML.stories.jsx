import React from 'react';
import html from '../../../../core/src/components/hero/hero.html?raw';

export default {
  title: 'HTML/USX/Hero',
  tags: ['USX', 'autodocs'],
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
