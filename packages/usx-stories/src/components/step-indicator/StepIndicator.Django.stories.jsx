// import React from 'react';
import config from '../../../../core/src/components/step-indicator/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './StepIndicator.React.stories.jsx';

export default {
  title: 'Django/USWDS/StepIndicator',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'step-indicator' });

export const Default = createStory(storyDefs.Default);
export const NoLabels = createStory(storyDefs.NoLabels);
export const Centered = createStory(storyDefs.Centered);
export const Counters = createStory(storyDefs.Counters);
export const CountersSmall = createStory(storyDefs.CountersSmall);
