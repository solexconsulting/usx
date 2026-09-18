import config from '../../../../usx-react/src/components/fieldset/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Fieldset.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/Fieldset',
  tags: ['USWDS', 'autodocs'],
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