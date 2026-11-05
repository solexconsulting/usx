import dataTableMeta, { storyDefs } from './DataTable.React.stories.jsx';

export default { ...dataTableMeta, title: 'React/USX/DataTable/Footers' };

export const Footer = { name: 'Population total', args: storyDefs.Footer };
export const FooterStatic = { name: 'Published total', args: storyDefs.FooterStatic };
export const FooterStatistics = { name: 'Summary statistics', args: storyDefs.FooterStatistics };
export const FooterCount = { name: 'Record count', args: storyDefs.FooterCount };
