import config from '../../../../usx-react/src/components/table/config.json';
import { buildArgTypes, componentInit, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Table.React.stories.jsx';

export default {
  title: 'Django/USWDS/Table',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props),
  decorators: componentInit('table'),
};

const story = createDjangoStory({ componentName: 'table' });
export const Default = story(storyDefs.Default);
export const Striped = story(storyDefs.Striped);
export const Borderless = story(storyDefs.Borderless);
export const Compact = story(storyDefs.Compact);
export const Scrollable = story(storyDefs.Scrollable);
export const Stacked = story(storyDefs.Stacked);
export const StackedHeader = story(storyDefs.StackedHeader);
export const StickyHeader = story(storyDefs.StickyHeader);
export const Sortable = story(storyDefs.Sortable);
