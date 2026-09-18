import React from 'react';
import config from '../../../../core/src/components/date-picker/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './DatePicker.React.stories.jsx';
import datePicker from "@uswds/uswds/js/usa-date-picker";

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/DatePicker',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`datePicker.init()`')
      }
    }
  },
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        // Set a delay because it's struggling
        const timeout = setTimeout(() => {
          datePicker.init();
        }, 400);
        return () => {
          clearTimeout(timeout);
        };
      }, []);

      return <Story />;
    }
  ]
};

const createStory = createDjangoStory({ componentName: 'date-picker' });

export const Default = createStory(storyDefs.Default);
export const Disabled = createStory(storyDefs.Disabled);
export const Required = createStory(storyDefs.Required);
export const WithDefaultValue = createStory(storyDefs.WithDefaultValue);
export const WithError = createStory(storyDefs.WithError);
export const MinMaxDate = createStory(storyDefs.MinMaxDate);
