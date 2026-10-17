import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/link/link.react-snapshot.html?raw';

export default {
  title: 'HTML/USWDS/Link',
  tags: ['USWDS', 'autodocs'],
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
