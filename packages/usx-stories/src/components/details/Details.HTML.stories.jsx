import React from 'react';
import html from '../../../../usx-react/src/components/details/details.html?raw';

export default {
  title: 'HTML/USX/Details',
  tags: ['USX', 'autodocs'],
};

/** Static snapshots of every React variant, with the same native disclosure behavior. */
export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: html,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  },
};
