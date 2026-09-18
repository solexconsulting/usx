import React from 'react';
import html from '../../../../usx-react/src/components/form-group/form-group.html?raw';

export default {
  title: 'HTML/USWDS/FormGroup',
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
