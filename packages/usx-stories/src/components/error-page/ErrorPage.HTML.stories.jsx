import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/error-page/error-page.react-snapshot.html?raw';

export default {
  title: 'HTML/USX/ErrorPage',
  tags: ['USX', 'autodocs'],
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: {
        code: reactSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />;
  },
};
