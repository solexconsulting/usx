import React from 'react';
import html from '../../../../core/src/components/copy-to-clipboard/copy-to-clipboard.html?raw';

export default {
  title: 'HTML/USX/CopyToClipboard',
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
