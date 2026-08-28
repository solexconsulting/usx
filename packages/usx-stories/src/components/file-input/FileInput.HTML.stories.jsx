import React from 'react';
import html from '../../../../core/src/components/file-input/file-input.html?raw';

export default {
  title: 'HTML/USWDS/FileInput',
  tags: ['USWDS', 'autodocs'],
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
