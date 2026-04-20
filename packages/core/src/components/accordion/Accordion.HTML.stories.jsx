import React from 'react';
import html from './accordion.html?raw';
import accordion from "@uswds/uswds/js/usa-accordion";

export default {
  title: 'HTML/Accordion',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        accordion.on();
        return () => accordion.off();
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
