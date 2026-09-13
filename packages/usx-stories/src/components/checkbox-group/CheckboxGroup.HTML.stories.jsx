import React from 'react';
import html from '../../../../core/src/components/checkbox-group/checkbox-group.html?raw';

export default {
  title: 'HTML/USWDS-Inspired/CheckboxGroup',
  tags: ['USWDS-Inspired', 'autodocs'],
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
