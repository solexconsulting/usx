import React from 'react';
import html from '../../../../core/src/components/villain/villain.html?raw';

export default {
  title: 'HTML/USWDS/Villain',
  tags: ['USWDS', 'autodocs'],
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
