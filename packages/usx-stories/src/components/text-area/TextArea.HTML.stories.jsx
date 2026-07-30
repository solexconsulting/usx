import React from 'react';
import html from '../../../../core/src/components/text-area/text-area.html?raw';

export default {
  title: 'HTML/USWDS/TextArea',
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
