import React from 'react';
import config from '../../../../usx-react/src/components/time-picker/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './TimePicker.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/TimePicker',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`timePicker.init()`')
      }
    }
  },
  decorators: [...componentInit('timePicker')]
};

const createStory = createDjangoStory({ componentName: 'time-picker' });

export const Default = createStory(storyDefs.Default);
export const Disabled = createStory(storyDefs.Disabled);
export const AriaDisabled = createStory(storyDefs.AriaDisabled);
export const Required = createStory(storyDefs.Required);
export const WithDefaultValue = createStory(storyDefs.WithDefaultValue);
export const WithError = createStory(storyDefs.WithError);
export const MinMaxStep = createStory(storyDefs.MinMaxStep);
