import React from 'react';
import html from '../../../../core/src/components/breadcrumb/breadcrumb.html?raw';

export default {
  title: 'HTML/USWDS/Breadcrumb',
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
