import React from 'react';
import html from '../../../../core/src/components/banner/banner.html?raw';

export default {
  title: 'HTML/USWDS/Banner',
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
