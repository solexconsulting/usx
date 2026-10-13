import React from 'react';
import html from '../../../../usx-react/src/components/date-range-picker/date-range-picker.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/DateRangePicker',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`datePicker.init()` and `dateRangePicker.init()`')
      }
    }
  },
  decorators: [...componentInit('datePicker', 'dateRangePicker')]
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
