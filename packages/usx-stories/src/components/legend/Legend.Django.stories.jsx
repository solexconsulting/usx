import config from '../../../../core/src/components/legend/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Legend.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/Legend',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'legend' });

export const Default = createStory(storyDefs.Default);
export const WithAdditionalClasses = createStory(storyDefs.WithAdditionalClasses);
export const WithRequired = createStory(storyDefs.WithRequired);
export const Large = createStory(storyDefs.Large);