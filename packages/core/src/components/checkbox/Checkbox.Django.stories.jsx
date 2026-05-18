import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Checkbox.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Checkbox',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory('checkbox');

export const Default = createStory(storyDefs.Default);
export const Checked = createStory(storyDefs.Checked);
export const Tile = createStory(storyDefs.Tile);
export const Description = createStory(storyDefs.Description);
export const TileWithDescription = createStory(storyDefs.TileWithDescription);
export const Disabled = createStory(storyDefs.Disabled);
export const DisabledChecked = createStory(storyDefs.DisabledChecked);
export const DisabledTile = createStory(storyDefs.DisabledTile);
export const DisabledCheckedTile = createStory(storyDefs.DisabledCheckedTile);
export const Small = createStory(storyDefs.Small);
export const SmallTile = createStory(storyDefs.SmallTile);
export const SmallDisabled = createStory(storyDefs.SmallDisabled);
export const SmallCheckedDisabled = createStory(storyDefs.SmallCheckedDisabled);
export const SmallTileDisabled = createStory(storyDefs.SmallTileDisabled);
export const SmallCheckedTileDisabled = createStory(storyDefs.SmallCheckedTileDisabled);
export const WithOnChange = createStory(storyDefs.WithOnChange);
export const Required = createStory(storyDefs.Required);
export const Error = createStory(storyDefs.Error);
export const Success = createStory(storyDefs.Success);