import React from 'react';
import html from '../../../../core/src/components/pagination/pagination.html?raw';

export default {
  title: 'HTML/USWDS/Pagination',
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
