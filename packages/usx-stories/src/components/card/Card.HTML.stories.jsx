import React from 'react';
import html from '../../../../usx-react/src/components/card/card.html?raw';

export default {
  title: 'HTML/USWDS/Card',
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
