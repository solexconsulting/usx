import config from '../../../../usx-react/src/components/memorable-date/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './MemorableDate.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/MemorableDate',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = createDjangoStory({ componentName: 'memorable-date' });

export const Default = createStory(storyDefs.Default);
export const Disabled = createStory(storyDefs.Disabled);
export const AriaDisabled = createStory(storyDefs.AriaDisabled);
export const Required = createStory(storyDefs.Required);
export const WithDefaultValues = createStory(storyDefs.WithDefaultValues);
export const WithError = createStory(storyDefs.WithError);
