import React from 'react';
import html from '../../../../core/src/components/select/select.html?raw';

export default {
  title: 'HTML/USWDS/Select',
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
