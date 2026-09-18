import config from '../../../../usx-react/src/components/summary-box/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './SummaryBox.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/SummaryBox',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'summary-box' });

export const ExecutiveSummary = createStory(storyDefs.ExecutiveSummary);
export const StoryStep1Context = createStory(storyDefs.StoryStep1Context);
export const StoryStep2Actions = createStory(storyDefs.StoryStep2Actions);
export const StoryStep3Outcomes = createStory(storyDefs.StoryStep3Outcomes);
export const StoryStep4Decision = createStory(storyDefs.StoryStep4Decision);
export const ChildrenPriority = createStory(storyDefs.ChildrenPriority);
export const WithListComponent = createStory(storyDefs.WithListComponent);
export const WithIconHighlights = createStory(storyDefs.WithIconHighlights);
