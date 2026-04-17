import React from 'react';
import html from './modal.html?raw';
import '../../../../../node_modules/@uswds/uswds/dist/js/uswds-init.js';

export default {
  title: 'HTML/Modal',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        const uswds_min = document.createElement('script');
        const uswds_init = document.createElement('script');
        uswds_min.src = '../node_modules/@uswds/uswds/dist/js/uswds.min.js';
        uswds_init.src = '../node_modules/@uswds/uswds/dist/js/uswds-init.min.js';
        document.body.appendChild(uswds_min);
        document.body.appendChild(uswds_init);

        return () => {
          document.body.removeChild(uswds_min);
          document.body.removeChild(uswds_init);
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
