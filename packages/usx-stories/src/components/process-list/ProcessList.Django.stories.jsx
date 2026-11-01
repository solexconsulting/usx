import config from '../../../../usx-react/src/components/process-list/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './ProcessList.React.stories.jsx';

export default {
  title: 'Django/USWDS/ProcessList',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'process-list' });

export const Default = createStory(storyDefs.Default);
export const HeadingOnly = createStory(storyDefs.HeadingOnly);
export const CustomSizing = createStory(storyDefs.CustomSizing);
