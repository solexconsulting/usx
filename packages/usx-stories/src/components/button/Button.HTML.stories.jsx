import React from 'react';
import buttonHtml from '../../../../core/src/components/button/button.html?raw';

export default {
  title: 'HTML/USWDS/Button',
  tags: ['USWDS', 'autodocs']
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: buttonHtml
      }
    }
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: buttonHtml }} />;
  }
}

