import React from 'react';
import html from '../../../../usx-react/src/components/page/page.html?raw';

export default {
  title: 'HTML/USX/Page',
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
