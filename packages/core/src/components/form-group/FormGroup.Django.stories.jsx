import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './FormGroup.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/FormGroup',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory('form-group');

export const Default = createStory(storyDefs.Default);
export const ErrorState = createStory(storyDefs.ErrorState);
export const SuccessState = createStory(storyDefs.SuccessState);
