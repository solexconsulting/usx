import React from 'react';
import html from '../../../../core/src/components/in-page-nav/in-page-nav.html?raw';
import inPageNavigation from '@uswds/uswds/js/usa-in-page-navigation';

export default {
  title: 'HTML/USWDS/InPageNav',
  tags: ['USWDS', 'autodocs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        inPageNavigation.on();
        return () => inPageNavigation.off();
      }, []);

      return <Story />;
    },
  ],
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
