import config from '../../../../usx-react/src/components/section/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Section.React.stories.jsx';

export default {
  title: 'Django/USX/Section',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'section' });

export const Default = createStory(storyDefs.Default);
export const WithTitle = createStory(storyDefs.WithTitle);
export const WithAdditionalClasses = createStory(storyDefs.WithAdditionalClasses);

export const WithHeadingLevel = createStory(storyDefs.WithHeadingLevel);

export const HeadingH1 = { ...createStory(storyDefs.HeadingH1), name: 'Heading H1' };
export const HeadingH2 = { ...createStory(storyDefs.HeadingH2), name: 'Heading H2' };
export const HeadingH3 = { ...createStory(storyDefs.HeadingH3), name: 'Heading H3' };
export const HeadingH4 = { ...createStory(storyDefs.HeadingH4), name: 'Heading H4' };
export const HeadingH5 = { ...createStory(storyDefs.HeadingH5), name: 'Heading H5' };
export const HeadingH6 = { ...createStory(storyDefs.HeadingH6), name: 'Heading H6' };
