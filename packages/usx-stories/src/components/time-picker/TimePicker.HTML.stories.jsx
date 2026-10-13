import React from 'react';
import html from '../../../../usx-react/src/components/time-picker/time-picker.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/TimePicker',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`timePicker.init()`')
      }
    }
  },
  decorators: [...componentInit('timePicker')]
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
