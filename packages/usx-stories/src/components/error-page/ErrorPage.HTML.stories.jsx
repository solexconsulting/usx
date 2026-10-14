import React from 'react';
import html from '../../../../usx-react/src/components/error-page/error-page.html?raw';

export default {
  title: 'HTML/USX/ErrorPage',
  tags: ['USX', 'autodocs'],
};

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
