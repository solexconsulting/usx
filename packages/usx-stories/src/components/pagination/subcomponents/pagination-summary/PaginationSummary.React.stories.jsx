import config from '../../../../../../usx-react/src/components/pagination-summary/config.json';
import PaginationSummary from '../../../../../../usx-react/src/components/pagination-summary/PaginationSummary.tsx';
import { buildArgTypes } from '../../../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: config.default,
  Empty: { currentPage: 1, pageSize: 10, totalItems: 0 },
  LastPage: { currentPage: 10, pageSize: 10, totalItems: 95, itemLabel: 'results' },
};

export default {
  title: 'React/USWDS/Pagination/Summary',
  component: PaginationSummary,
  tags: ['USWDS', 'autodocs'],
  excludeStories: ['storyDefs'],
  argTypes: buildArgTypes(config.props),
};

export const Default = { args: storyDefs.Default };
export const Empty = { args: storyDefs.Empty };
export const LastPage = { args: storyDefs.LastPage };
