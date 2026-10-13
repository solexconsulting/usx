import React from 'react';
import html from '../../../../usx-react/src/components/file-input/file-input.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/FileInput',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`fileInput.init()`')
      }
    }
  },
  decorators: [...componentInit('fileInput')]
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
