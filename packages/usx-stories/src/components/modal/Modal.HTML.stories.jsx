import React from 'react';
import html from '../../../../usx-react/src/components/modal/modal.html?raw';

import modal from "@uswds/uswds/js/usa-modal";
import { uswdsInitNote } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/Modal',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`modal.init()`')
      }
    }
  },
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        modal.init();
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
