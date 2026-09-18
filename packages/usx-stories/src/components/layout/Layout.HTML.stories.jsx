import React from 'react';
import html from '../../../../usx-react/src/components/layout/layout.html?raw';

export default {
  title: 'HTML/USX/Layout',
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
