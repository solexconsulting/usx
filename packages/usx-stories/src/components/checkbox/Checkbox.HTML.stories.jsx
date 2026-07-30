import React from 'react';
import html from '../../../../core/src/components/checkbox/checkbox.html?raw';

export default {
  title: 'HTML/USWDS/Checkbox',
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
