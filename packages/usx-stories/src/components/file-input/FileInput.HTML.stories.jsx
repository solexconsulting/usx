import React from 'react';
import html from '../../../../core/src/components/file-input/file-input.html?raw';
import fileInput from '@uswds/uswds/js/usa-file-input';

export default {
  title: 'HTML/USWDS/FileInput',
  tags: ['USWDS', 'autodocs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        fileInput.on();
        return () => fileInput.off();
      }, []);

      return <Story />;
    }
  ]
};

export const AllVariants = {
  tags: ['USX'],
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
