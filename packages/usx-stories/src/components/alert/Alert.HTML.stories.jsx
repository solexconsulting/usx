import React from 'react';
import alertHtml from '../../../../core/src/components/alert/alert.html?raw';

export default {
  title: 'HTML/USWDS/Alert',
  tags: ['USWDS', 'autodocs']
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: alertHtml
      }
    }
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: alertHtml }} />;
  }
}

