import config from '../../../../../../usx-react/src/components/pagination-step-options/config.json';
import { buildArgTypes, createDjangoStory } from '../../../../utils/storyHelpers.jsx';
import { storyDefs } from './PaginationStepOptions.React.stories.jsx';

export default {
  title: 'Django/USWDS/Pagination/Step Options',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props),
};

const createStory = createDjangoStory({ componentName: 'pagination-step-options' });

export const Default = createStory(storyDefs.Default);
export const Custom = createStory(storyDefs.Custom);
