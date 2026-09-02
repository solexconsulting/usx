import React from 'react';
import html from '../../../../core/src/components/date-range-picker/date-range-picker.html?raw';
import datePicker from "@uswds/uswds/js/usa-date-picker";
import dateRangePicker from "@uswds/uswds/js/usa-date-range-picker";

export default {
  title: 'HTML/USWDS/DateRangePicker',
  tags: ['USWDS', 'autodocs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        datePicker.init();
        dateRangePicker.init();
        return () => {
          dateRangePicker.off();
          datePicker.off();
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
