import React from 'react';
import html from '../../../../core/src/components/sidenav/sidenav.html?raw';

export default {
  title: 'HTML/USWDS/SideNav',
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
