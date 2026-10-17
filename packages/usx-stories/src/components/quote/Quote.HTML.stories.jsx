import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/quote/quote.react-snapshot.html?raw';

export default {
  title: 'HTML/USX/Quote',
  tags: ['USX', 'autodocs'],
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: { code: reactSnapshot },
    },
  },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
};
