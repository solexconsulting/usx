import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Tag.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Tag',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = createDjangoStory({ componentName: 'tag' });

export const Default = createStory(storyDefs.Default);
export const WithIcon = createStory(storyDefs.WithIcon);
export const Big = createStory(storyDefs.Big);
export const Primary = createStory(storyDefs.Primary);
export const Secondary = createStory(storyDefs.Secondary);
export const AccentCool = createStory(storyDefs.AccentCool);
export const Blue = createStory(storyDefs.Blue);
export const Base = createStory(storyDefs.Base);
export const OutlinePrimary = createStory(storyDefs.OutlinePrimary);
export const OutlineSecondary = createStory(storyDefs.OutlineSecondary);
export const OutlineAccentCool = createStory(storyDefs.OutlineAccentCool);
export const OutlineBlue = createStory(storyDefs.OutlineBlue);
export const OutlineBase = createStory(storyDefs.OutlineBase);
export const Info = createStory(storyDefs.Info);
export const Success = createStory(storyDefs.Success);
export const Warning = createStory(storyDefs.Warning);
export const Error = createStory(storyDefs.Error);
