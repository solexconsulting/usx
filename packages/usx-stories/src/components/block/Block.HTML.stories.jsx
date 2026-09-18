import React from 'react';
import html from '../../../../usx-react/src/components/block/block.html?raw';

export default {
  title: 'HTML/USX/Block',
  tags: ['USX', 'autodocs'],
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: html
      }
    }
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
}
