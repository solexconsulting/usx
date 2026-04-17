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
        const uswds_min = document.createElement('script');
        uswds_min.src = '../node_modules/@uswds/uswds/dist/js/uswds.min.js';
        document.body.appendChild(uswds_min);

        return () => {
          accordion.off();
          document.body.removeChild(uswds_min);
        };
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
