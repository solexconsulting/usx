import config from '../../../../../../usx-react/src/components/pagination-step-options/config.json';
import PaginationStepOptions from '../../../../../../usx-react/src/components/pagination-step-options/PaginationStepOptions.tsx';
import { buildArgTypes } from '../../../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: config.default,
  Custom: {
    id: 'pagination-step-options-custom',
    label: 'Rows per page',
    pageSize: 25,
    pageSizeOptions: [10, 25, 50],
  },
};

export default {
  title: 'React/USWDS/Pagination/Step Options',
  component: PaginationStepOptions,
  tags: ['USWDS', 'autodocs'],
  excludeStories: ['storyDefs'],
  argTypes: buildArgTypes(config.props),
};

export const Default = { args: storyDefs.Default };
export const Custom = { args: storyDefs.Custom };
