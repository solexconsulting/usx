import React from 'react';
import html from '../../../../usx-react/src/components/in-page-nav/in-page-nav.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/InPageNav',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`inPageNavigation.init()`')
      }
    }
  },
  decorators: [...componentInit('inPageNavigation')],
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
