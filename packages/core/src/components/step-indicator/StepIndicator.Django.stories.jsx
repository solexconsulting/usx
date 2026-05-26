import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './StepIndicator.React.stories.jsx';

export default {
  title: 'Django/StepIndicator',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'step-indicator' });

export const Default = createStory(storyDefs.Default);
export const NoLabels = createStory(storyDefs.NoLabels);
export const Centered = createStory(storyDefs.Centered);
export const Counters = createStory(storyDefs.Counters);
export const CountersSmall = createStory(storyDefs.CountersSmall);
