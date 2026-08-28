import config from '../../../../core/src/components/breadcrumb/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Breadcrumb.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/Breadcrumb',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'breadcrumb' });

export const Default = createStory(storyDefs.Default);
export const WithRdfa = createStory(storyDefs.WithRdfa);
export const Wrap = createStory(storyDefs.Wrap);
export const WithClassName = createStory(storyDefs.WithClassName);
export const Empty = createStory(storyDefs.Empty);
