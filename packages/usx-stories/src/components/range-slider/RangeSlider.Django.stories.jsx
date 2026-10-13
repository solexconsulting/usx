import React from 'react';
import config from '../../../../usx-react/src/components/range-slider/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './RangeSlider.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/RangeSlider',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`range.init()`')
      }
    }
  },
  decorators: [...componentInit('range')]
};

const createStory = createDjangoStory({ componentName: 'range-slider' });

export const Default = createStory(storyDefs.Default);
export const WithUnit = createStory(storyDefs.WithUnit);
export const WithPreposition = createStory(storyDefs.WithPreposition);
export const FineStep = createStory(storyDefs.FineStep);
export const CustomRange = createStory(storyDefs.CustomRange);
export const WithError = createStory(storyDefs.WithError);
export const Disabled = createStory(storyDefs.Disabled);
