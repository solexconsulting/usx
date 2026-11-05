import dataTableMeta from './DataTable.Django.stories.jsx';
import { storyDefs } from './DataTable.React.stories.jsx';
import { createDjangoStory } from '../../utils/storyHelpers.jsx';

export default { ...dataTableMeta, title: 'Django/USX/DataTable/Footers' };

const createStory = createDjangoStory({ componentName: 'data-table' });

export const Footer = { name: 'Population total', ...createStory(storyDefs.Footer) };
export const FooterStatic = { name: 'Published total', ...createStory(storyDefs.FooterStatic) };
export const FooterStatistics = {
  name: 'Summary statistics',
  ...createStory(storyDefs.FooterStatistics),
};
export const FooterCount = { name: 'Record count', ...createStory(storyDefs.FooterCount) };
