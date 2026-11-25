import config from '../../../../../../usx-react/src/components/pagination-navigation/config.json';
import { getPageItems, getUnboundedPageItems } from '../../../../../../usx-react/src/components/pagination-navigation/PaginationNavigation.tsx';
import { buildArgTypes, createDjangoStory } from '../../../../utils/storyHelpers.jsx';
import { storyDefs } from './PaginationNavigation.React.stories.jsx';

export default {
  title: 'Django/USWDS/Pagination/Navigation',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props),
};

const createStory = createDjangoStory({ componentName: 'pagination-navigation' });
const djangoArgs = ({ currentPage, totalPages, ...args }) => ({
  ...args,
  currentPage,
  totalPages,
  unbounded: totalPages == null,
  pages: totalPages == null
    ? getUnboundedPageItems(currentPage)
    : getPageItems(currentPage, totalPages),
});

export const Default = createStory(djangoArgs(storyDefs.Default));
export const Bounded = createStory(djangoArgs(storyDefs.Bounded));
export const Unbounded = createStory(djangoArgs(storyDefs.Unbounded));
export const IconOnly = createStory(djangoArgs(storyDefs.IconOnly));
export const UnboundedIconOnly = createStory(djangoArgs(storyDefs.UnboundedIconOnly));
