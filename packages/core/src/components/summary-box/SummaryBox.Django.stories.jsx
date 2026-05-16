import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './SummaryBox.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/SummaryBox',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['djangoStoryDefs'],
};

const createStory = createDjangoStory('summary-box');

export const djangoStoryDefs = {
  WithListMarkup: {
    heading: 'Program timeline summary',
    content: '<ol class="usa-list"><li><strong>Week 1-2:</strong> Established intake baselines and partner staffing map.</li><li><strong>Week 3-6:</strong> Launched weekend processing and two temporary warming sites.</li><li><strong>Week 7-10:</strong> Expanded SMS intake and reduced median placement times.</li><li><strong>Week 11-12:</strong> Prepared permanent staffing and statewide scale recommendations.</li></ol>',
  },
};

export const ExecutiveSummary = createStory(storyDefs.ExecutiveSummary);
export const StoryStep1Context = createStory(storyDefs.StoryStep1Context);
export const StoryStep2Actions = createStory(storyDefs.StoryStep2Actions);
export const StoryStep3Outcomes = createStory(storyDefs.StoryStep3Outcomes);
export const StoryStep4Decision = createStory(storyDefs.StoryStep4Decision);
export const ChildrenPriority = createStory(storyDefs.ChildrenPriority);
export const WithListMarkup = createStory(djangoStoryDefs.WithListMarkup);
