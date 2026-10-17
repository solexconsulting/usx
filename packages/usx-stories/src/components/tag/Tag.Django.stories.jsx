import config from '../../../../usx-react/src/components/tag/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Tag.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/Tag',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = createDjangoStory({ componentName: 'tag' });

export const Default = createStory(storyDefs.Default);
export const WithIcon = { ...createStory(storyDefs.WithIcon), name: 'With icon' };
export const Big = { ...createStory(storyDefs.Big), name: 'Big tag' };
export const BigWithIcon = { ...createStory(storyDefs.BigWithIcon), name: 'Big with icon' };
export const Dismissible = createStory(storyDefs.Dismissible);
export const DismissibleWithCallback = createStory(storyDefs.DismissibleWithCallback);
export const Primary = { ...createStory(storyDefs.Primary), name: 'Primary color' };
export const Secondary = { ...createStory(storyDefs.Secondary), name: 'Secondary color' };
export const AccentCool = { ...createStory(storyDefs.AccentCool), name: 'Accent Cool color' };
export const Blue = { ...createStory(storyDefs.Blue), name: 'Blue color' };
export const Base = { ...createStory(storyDefs.Base), name: 'Base color' };
export const OutlinePrimary = { ...createStory(storyDefs.OutlinePrimary), name: 'Outline style: Primary' };
export const OutlineSecondary = { ...createStory(storyDefs.OutlineSecondary), name: 'Outline style: Secondary' };
export const OutlineAccentCool = { ...createStory(storyDefs.OutlineAccentCool), name: 'Outline style: Accent Cool' };
export const OutlineBlue = { ...createStory(storyDefs.OutlineBlue), name: 'Outline style: Blue' };
export const OutlineBase = { ...createStory(storyDefs.OutlineBase), name: 'Outline style: Base' };
export const Info = createStory(storyDefs.Info);
export const Success = createStory(storyDefs.Success);
export const Warning = createStory(storyDefs.Warning);
export const Error = createStory(storyDefs.Error);
