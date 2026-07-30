import React from 'react';
import inputHtml from '../../../../core/src/components/input/input.html?raw';

export default {
  title: 'HTML/USWDS/Input',
  tags: ['USWDS', 'autodocs'],
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: inputHtml
      }
    }
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: inputHtml }} />;
  }
}
