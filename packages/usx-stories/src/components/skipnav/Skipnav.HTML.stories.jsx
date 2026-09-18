import React from 'react';
import html from '../../../../usx-react/src/components/skipnav/skipnav.html?raw';

export default {
  title: 'HTML/USWDS/Skipnav',
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
