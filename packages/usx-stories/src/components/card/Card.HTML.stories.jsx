import React from 'react';
import html from '../../../../usx-react/src/components/card/card.html?raw';
import { componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/Card',
  tags: ['USWDS', 'autodocs'],
  decorators: [...componentInit('carousel')],
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
