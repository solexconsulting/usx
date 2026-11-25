import config from '../../../../../../usx-react/src/components/pagination-navigation/config.json';
import PaginationNavigation from '../../../../../../usx-react/src/components/pagination-navigation/PaginationNavigation.tsx';
import { buildArgTypes } from '../../../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: config.default,
  Bounded: { currentPage: 10, totalPages: 24 },
  Unbounded: { currentPage: 10 },
  IconOnly: { currentPage: 5, totalPages: 20, hideLinkText: true },
  UnboundedIconOnly: { currentPage: 5, hideLinkText: true },
};

export default {
  title: 'React/USWDS/Pagination/Navigation',
  component: PaginationNavigation,
  tags: ['USWDS', 'autodocs'],
  excludeStories: ['storyDefs'],
  argTypes: buildArgTypes(config.props),
};

export const Default = { args: storyDefs.Default };
export const Bounded = { args: storyDefs.Bounded };
export const Unbounded = { args: storyDefs.Unbounded };
export const IconOnly = { args: storyDefs.IconOnly };
export const UnboundedIconOnly = { args: storyDefs.UnboundedIconOnly };
