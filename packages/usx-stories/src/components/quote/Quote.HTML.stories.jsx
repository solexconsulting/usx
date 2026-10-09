import React from 'react';
import html from '../../../../usx-react/src/components/quote/quote.html?raw';

export default {
  title: 'HTML/USX/Quote',
  tags: ['USX', 'autodocs'],
};

export const Default = {
  parameters: {
    docs: {
      source: { code: html },
    },
  },
  render: () => <div dangerouslySetInnerHTML={{ __html: html }} />,
};
