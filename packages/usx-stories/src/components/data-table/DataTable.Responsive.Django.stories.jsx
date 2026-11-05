import dataTableMeta from './DataTable.Django.stories.jsx';
import { storyDefs } from './DataTable.React.stories.jsx';
import { createDjangoStory } from '../../utils/storyHelpers.jsx';

export default { ...dataTableMeta, title: 'Django/USX/DataTable/Responsive' };

const createStory = createDjangoStory({ componentName: 'data-table' });

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
