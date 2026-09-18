import proseConfig from '../../../../usx-react/src/components/prose/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Prose.React.stories.jsx';

export default {
  title: 'Django/USWDS/Prose',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(proseConfig.props || {}),
};

const createStory = createDjangoStory({ componentName: 'prose' });
const allowedPropNames = new Set(Object.keys(proseConfig.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const Default = createStory(toDjangoArgs(storyDefs.Default));
export const ProseWithDiv = createStory(toDjangoArgs(storyDefs.ProseWithDiv));
export const ProseWithArticle = createStory(toDjangoArgs(storyDefs.ProseWithArticle));
export const ProseWithSection = createStory(toDjangoArgs(storyDefs.ProseWithSection));
export const ProseWithMain = createStory(toDjangoArgs(storyDefs.ProseWithMain));
