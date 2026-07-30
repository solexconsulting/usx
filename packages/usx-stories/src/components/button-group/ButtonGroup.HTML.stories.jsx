import React from 'react';
import html from '../../../../core/src/components/button-group/button-group.html?raw';

export default {
  title: 'HTML/USWDS/ButtonGroup',
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
