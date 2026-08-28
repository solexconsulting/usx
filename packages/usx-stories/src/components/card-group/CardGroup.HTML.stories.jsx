import React from 'react';
import html from '../../../../core/src/components/card-group/card-group.html?raw';

export default {
  title: 'HTML/USWDS/CardGroup',
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
