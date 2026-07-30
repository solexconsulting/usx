import React from 'react';
import html from '../../../../core/src/components/search/search.html?raw';

export default {
  title: 'HTML/USWDS/Search',
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
