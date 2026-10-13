import React from 'react';
import config from '../../../../usx-react/src/components/date-range-picker/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './DateRangePicker.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/DateRangePicker',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`datePicker.init()` and `dateRangePicker.init()`')
      }
    }
  },
  decorators: [...componentInit('datePicker', 'dateRangePicker')]
};

const createStory = createDjangoStory({ componentName: 'date-range-picker' });

export const Default = createStory(storyDefs.Default);
export const Disabled = createStory(storyDefs.Disabled);
export const Required = createStory(storyDefs.Required);
export const WithDefaultValues = createStory(storyDefs.WithDefaultValues);
export const WithError = createStory(storyDefs.WithError);
export const MinMaxDate = createStory(storyDefs.MinMaxDate);
