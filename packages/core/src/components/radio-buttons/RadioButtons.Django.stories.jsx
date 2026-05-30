import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './RadioButtons.React.stories.jsx';

export default {
  title: 'Django/RadioButtons',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'radio-buttons' });
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const Default = createStory(toDjangoArgs(storyDefs.Default));
export const WithDefaultValue = createStory(toDjangoArgs(storyDefs.WithDefaultValue));
export const WithDescriptions = createStory(toDjangoArgs(storyDefs.WithDescriptions));
export const Tile = createStory(toDjangoArgs(storyDefs.Tile));
export const TileWithDescriptions = createStory(toDjangoArgs(storyDefs.TileWithDescriptions));
export const Small = createStory(toDjangoArgs(storyDefs.Small));
export const SmallTile = createStory(toDjangoArgs(storyDefs.SmallTile));
export const SmallTileWithDescriptions = createStory(toDjangoArgs(storyDefs.SmallTileWithDescriptions));
export const WithAdditionalClass = createStory(toDjangoArgs(storyDefs.WithAdditionalClass));
