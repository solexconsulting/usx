import React from 'react';
import html from '../../../../core/src/components/legend/legend.html?raw';

export default {
  title: 'HTML/USWDS/Legend',
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
