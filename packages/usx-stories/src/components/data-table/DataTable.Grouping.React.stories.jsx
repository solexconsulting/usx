import dataTableMeta, { storyDefs } from './DataTable.React.stories.jsx';

export default { ...dataTableMeta, title: 'React/USX/DataTable/Grouping' };

export const GroupedRows = { args: storyDefs.GroupedRows };
export const GroupedCollapsedByDefault = {
  name: 'Grouped (collapsed)',
  args: storyDefs.GroupedCollapsedByDefault,
};
export const GroupedMatrix = { args: storyDefs.GroupedMatrix };
