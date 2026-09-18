import config from '../../../../usx-react/src/components/process-list/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './ProcessList.React.stories.jsx';

export default {
  title: 'Django/USWDS/ProcessList',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'process-list' });

const toDjangoItems = (items) =>
  items.map((item) => ({
    ...item,
    body: typeof item.body === 'string' ? item.body : undefined,
  }));

export const Default = createStory({ items: toDjangoItems(storyDefs.Default.items) });
export const HeadingOnly = createStory({ items: toDjangoItems(storyDefs.HeadingOnly.items) });
export const CustomSizing = createStory({ items: toDjangoItems(storyDefs.CustomSizing.items) });


