import config from '../../../../usx-react/src/components/table/config.json';
import { buildArgTypes, componentInit, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Table.React.stories.jsx';

export default {
  excludeStories: ['Unenhanced'],
  title: 'Django/USWDS/Table',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props),
  decorators: componentInit('table'),
};

const story = createDjangoStory({ componentName: 'table' });
export const Default = story(storyDefs.Default);
export const Unenhanced = { ...story(storyDefs.Unenhanced), parameters: { docs: { description: { story: 'Every row remains readable in its original order. Column sorting requires the USWDS table script.' } } } };
export const Striped = story(storyDefs.Striped);
export const Borderless = story(storyDefs.Borderless);
export const Compact = story(storyDefs.Compact);
export const Scrollable = story(storyDefs.Scrollable);
export const Stacked = story(storyDefs.Stacked);
export const StackedHeader = story(storyDefs.StackedHeader);
export const StickyHeader = story(storyDefs.StickyHeader);
export const Sortable = story(storyDefs.Sortable);
