import React from 'react';
import config from '../../../../usx-react/src/components/date-picker/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './DatePicker.React.stories.jsx';

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
  decorators: [...componentInit('datePicker')]
};

const createStory = createDjangoStory({ componentName: 'date-picker' });

export const Default = createStory(storyDefs.Default);
export const Disabled = createStory(storyDefs.Disabled);
export const Required = createStory(storyDefs.Required);
export const WithDefaultValue = createStory(storyDefs.WithDefaultValue);
export const WithError = createStory(storyDefs.WithError);
export const MinMaxDate = createStory(storyDefs.MinMaxDate);
