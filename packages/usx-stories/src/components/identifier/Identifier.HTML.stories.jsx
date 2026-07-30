import React from 'react';
import html from '../../../../core/src/components/identifier/identifier.html?raw';

export default {
  title: 'HTML/USWDS/Identifier',
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
