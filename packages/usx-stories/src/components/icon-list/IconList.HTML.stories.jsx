import React from 'react';
import html from '../../../../core/src/components/icon-list/icon-list.html?raw';

export default {
  title: 'HTML/USWDS/IconList',
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
