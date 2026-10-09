import React from 'react';
import html from '../../../../usx-react/src/components/callout/callout.html?raw';

export default {
  title: 'HTML/USX/Callout',
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
