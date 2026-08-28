import React from 'react';
import html from '../../../../core/src/components/in-page-nav/in-page-nav.html?raw';

export default {
  title: 'HTML/USWDS/InPageNav',
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
