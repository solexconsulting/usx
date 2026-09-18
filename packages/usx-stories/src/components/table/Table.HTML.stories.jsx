import React from 'react';
import html from '../../../../usx-react/src/components/table/table.html?raw';

export default {
  title: 'HTML/USWDS/Table',
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
