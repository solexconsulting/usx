import React from 'react';
import html from '../../../../core/src/components/collection/collection.html?raw';

export default {
  title: 'HTML/USWDS/Collection',
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
