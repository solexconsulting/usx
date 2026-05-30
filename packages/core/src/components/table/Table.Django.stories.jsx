import { storyDefs } from './Table.React.stories.jsx';
import { createDjangoStory } from '../../utils/storyHelpers';

export default {
  title: 'Django/Table',
  tags: ['autodocs'],
  parameters: {
    renderer: 'django',
    docs: {
      description: {
        component: 'Django Table component - consumes React storyDefs',
      },
    },
  },
};

const createStory = createDjangoStory({ componentName: 'table' });

export const Standard = createStory(storyDefs.Standard);
export const Striped = createStory(storyDefs.Striped);
export const Borderless = createStory(storyDefs.Borderless);
export const Compact = createStory(storyDefs.Compact);
export const ScrollableHorizontal = {
  name: 'Scrollable (horizontal)',
  ...createStory(storyDefs.ScrollableHorizontal),
};
export const ScrollableVertical = {
  name: 'Scrollable (vertical)',
  ...createStory(storyDefs.ScrollableVertical),
};
export const StickyFirstColumn = createStory(storyDefs.StickyFirstColumn);
export const ResponsiveStacked = createStory(storyDefs.ResponsiveStacked);
export const ResponsiveStackedHeader = createStory(storyDefs.ResponsiveStackedHeader);
export const Sortable = createStory(storyDefs.Sortable);
export const SortableAll = {
  name: 'Sortable (all columns)',
  ...createStory(storyDefs.SortableAll),
};
export const CheckboxSelection = createStory(storyDefs.CheckboxSelection);
export const CheckboxSelectionRight = {
  name: 'Checkbox (right)',
  ...createStory(storyDefs.CheckboxSelectionRight),
};
export const RadioSelection = createStory(storyDefs.RadioSelection);
export const DisabledRows = createStory(storyDefs.DisabledRows);
export const GroupedRows = createStory(storyDefs.GroupedRows);
export const GroupedCollapsedByDefault = {
  name: 'Grouped (collapsed)',
  ...createStory(storyDefs.GroupedCollapsedByDefault),
};
