import React from 'react';
import html from '../../../../usx-react/src/components/process-list/process-list.html?raw';

export default {
  title: 'HTML/USWDS/ProcessList',
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
