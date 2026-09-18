import React from 'react';
import config from '../../../../usx-react/src/components/time-picker/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './TimePicker.React.stories.jsx';
import timePicker from "@uswds/uswds/js/usa-time-picker";

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
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        // Set a delay because it's struggling
        const timeout = setTimeout(() => {
          timePicker.init();
        }, 400);
        return () => {
          clearTimeout(timeout);
        };
      }, []);

      return <Story />;
    }
  ]
};

const createStory = createDjangoStory({ componentName: 'time-picker' });

export const Default = createStory(storyDefs.Default);
export const Disabled = createStory(storyDefs.Disabled);
export const AriaDisabled = createStory(storyDefs.AriaDisabled);
export const Required = createStory(storyDefs.Required);
export const WithDefaultValue = createStory(storyDefs.WithDefaultValue);
export const WithError = createStory(storyDefs.WithError);
export const MinMaxStep = createStory(storyDefs.MinMaxStep);
