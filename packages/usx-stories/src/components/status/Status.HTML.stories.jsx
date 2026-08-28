import React from 'react';
import html from '../../../../core/src/components/status/status.html?raw';

export default {
  title: 'HTML/USX/Status',
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
