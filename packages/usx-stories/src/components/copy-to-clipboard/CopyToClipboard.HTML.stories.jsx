import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/copy-to-clipboard/copy-to-clipboard.react-snapshot.html?raw';

export default {
  title: 'HTML/USX/CopyToClipboard',
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
