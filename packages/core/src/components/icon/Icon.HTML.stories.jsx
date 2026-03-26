import React from 'react';
import iconHtml from './icon.html?raw';

export default {
  title: 'HTML/Icon',
  tags: ['autodocs']
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: iconHtml
      }
    }
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: iconHtml }} />;
  }
}
