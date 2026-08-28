import React from 'react';
import html from '../../../../core/src/components/site-alert/site-alert.html?raw';

export default {
  title: 'HTML/USWDS/SiteAlert',
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
