import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Fieldset.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Fieldset',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'fieldset' });

export const Default = createStory(storyDefs.Default);
export const NoLegend = createStory(storyDefs.NoLegend);
export const RequiredLegend = createStory(storyDefs.RequiredLegend);
export const WithCustomClass = createStory(storyDefs.WithCustomClass);
export const LargeLegend = createStory(storyDefs.LargeLegend);
export const Disabled = createStory(storyDefs.Disabled);