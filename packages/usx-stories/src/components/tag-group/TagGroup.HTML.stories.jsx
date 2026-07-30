import React from 'react';
import html from '../../../../core/src/components/tag-group/tag-group.html?raw';

export default {
  title: 'HTML/USWDS-Inspired/TagGroup',
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
