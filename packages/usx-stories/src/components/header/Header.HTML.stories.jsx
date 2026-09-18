import React from 'react';
import html from '../../../../usx-react/src/components/header/header.html?raw';

export default {
  title: 'HTML/USWDS/Header',
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
