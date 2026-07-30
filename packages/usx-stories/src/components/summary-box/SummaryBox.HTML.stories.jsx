import React from 'react';
import html from '../../../../core/src/components/summary-box/summary-box.html?raw';

export default {
  title: 'HTML/USWDS/SummaryBox',
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
