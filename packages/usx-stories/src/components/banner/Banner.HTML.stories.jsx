import React from 'react';
import html from '../../../../usx-react/src/components/banner/banner.html?raw';
import { componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/Banner',
  tags: ['USWDS', 'autodocs'],
  decorators: [...componentInit('banner')],
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
