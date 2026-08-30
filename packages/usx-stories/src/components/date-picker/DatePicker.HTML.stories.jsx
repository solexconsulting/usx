import React from 'react';
import html from '../../../../core/src/components/date-picker/date-picker.html?raw';
import datePicker from "@uswds/uswds/js/usa-date-picker";

export default {
  title: 'HTML/USWDS/DatePicker',
  tags: ['USWDS', 'autodocs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        datePicker.init();
        return () => datePicker.off();
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
