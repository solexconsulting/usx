import config from '../../../../usx-react/src/components/misc-banner/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './MiscBanner.React.stories.jsx';

export default {
  title: 'Django/USX/MiscBanner',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'misc-banner' });

export const Misc = createStory(storyDefs.Misc);
export const Primary = createStory(storyDefs.Primary);
export const Beta = createStory(storyDefs.Beta);
export const Dev = createStory(storyDefs.Dev);
export const TestStaging = createStory(storyDefs.TestStaging);
export const NoLinks = createStory(storyDefs.NoLinks);
