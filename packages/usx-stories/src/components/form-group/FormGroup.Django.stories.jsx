import config from '../../../../core/src/components/form-group/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './FormGroup.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/FormGroup',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'form-group' });

export const Default = createStory(storyDefs.Default);
export const ErrorState = createStory(storyDefs.ErrorState);
export const SuccessState = createStory(storyDefs.SuccessState);
