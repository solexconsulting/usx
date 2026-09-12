import React from 'react';
import html from '../../../../core/src/components/file-list/file-list.html?raw';

export default {
  title: 'HTML/USX/FileList',
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
