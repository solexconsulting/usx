import React from 'react';
import html from '../../../../usx-react/src/components/icon-list/icon-list.html?raw';

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
