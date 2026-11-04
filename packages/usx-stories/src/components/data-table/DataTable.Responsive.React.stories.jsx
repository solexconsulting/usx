import dataTableMeta, { storyDefs } from './DataTable.React.stories.jsx';

export default { ...dataTableMeta, title: 'React/USX/DataTable/Responsive' };

export const ScrollableHorizontal = {
  name: 'Scrollable (horizontal)',
  args: storyDefs.ScrollableHorizontal,
};
export const ScrollableVertical = {
  name: 'Scrollable (vertical)',
  args: storyDefs.ScrollableVertical,
};
export const StickyFirstColumn = { args: storyDefs.StickyFirstColumn };
export const ResponsiveStacked = { args: storyDefs.ResponsiveStacked };
export const ResponsiveStackedHeader = { args: storyDefs.ResponsiveStackedHeader };
