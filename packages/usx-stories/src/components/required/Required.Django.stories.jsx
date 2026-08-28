import config from '../../../../core/src/components/required/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Required.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USX/Required',
  tags: ['USX', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'required' });

export const Default = createStory(storyDefs.Default);
export const WithCustomTitle = createStory(storyDefs.WithCustomTitle);
