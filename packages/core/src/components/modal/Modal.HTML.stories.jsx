import React from 'react';
import html from './modal.html?raw';

import modal from "@uswds/uswds/js/usa-modal";

export default {
  title: 'HTML/Modal',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        modal.on();
        return () => modal.off();
      }, []);

      return <Story />;
    }
  ]
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
