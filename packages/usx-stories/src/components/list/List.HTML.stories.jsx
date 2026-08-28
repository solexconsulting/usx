import React from 'react';
import html from '../../../../core/src/components/list/list.html?raw';

export default {
  title: 'HTML/USWDS/List',
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
