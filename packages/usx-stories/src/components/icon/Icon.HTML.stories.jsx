import React from 'react';
import iconHtml from '../../../../core/src/components/icon/icon.html?raw';

export default {
  title: 'HTML/USWDS/Icon',
  tags: ['USWDS', 'autodocs']
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: iconHtml
      }
    }
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: iconHtml }} />;
  }
}
