import React from 'react';
import html from '../../../../core/src/components/memorable-date/memorable-date.html?raw';

export default {
  title: 'HTML/USWDS/MemorableDate',
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
