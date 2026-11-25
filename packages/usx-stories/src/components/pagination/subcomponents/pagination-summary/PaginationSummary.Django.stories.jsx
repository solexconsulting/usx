import config from '../../../../../../usx-react/src/components/pagination-summary/config.json';
import { buildArgTypes, createDjangoStory } from '../../../../utils/storyHelpers.jsx';
import { storyDefs } from './PaginationSummary.React.stories.jsx';

export default {
  title: 'Django/USWDS/Pagination/Summary',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props),
};

const createStory = createDjangoStory({ componentName: 'pagination-summary' });

export const Default = createStory(storyDefs.Default);
export const Empty = createStory(storyDefs.Empty);
export const LastPage = createStory(storyDefs.LastPage);
