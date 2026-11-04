import dataTableMeta from './DataTable.Django.stories.jsx';
import { storyDefs } from './DataTable.React.stories.jsx';
import { createDjangoStory } from '../../utils/storyHelpers.jsx';

export default { ...dataTableMeta, title: 'Django/USX/DataTable/Grouping' };

const createStory = createDjangoStory({ componentName: 'data-table' });

export const GroupedRows = createStory(storyDefs.GroupedRows);
export const GroupedCollapsedByDefault = {
  name: 'Grouped (collapsed)',
  ...createStory(storyDefs.GroupedCollapsedByDefault),
};
export const GroupedMatrix = createStory(storyDefs.GroupedMatrix);
