import React from 'react';
import html from '../../../../usx-react/src/components/back-to-top/back-to-top.html?raw';

export default {
  title: 'HTML/USX/BackToTop',
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
