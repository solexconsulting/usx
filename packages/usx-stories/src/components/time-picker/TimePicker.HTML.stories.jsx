import React from 'react';
import html from '../../../../core/src/components/time-picker/time-picker.html?raw';
import timePicker from "@uswds/uswds/js/usa-time-picker";
import { uswdsInitNote } from '../../utils/storyHelpers.jsx';

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
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        timePicker.init();
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
