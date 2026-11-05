import React from 'react';
import config from '../../../../usx-react/src/components/switch/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Switch.React.stories.jsx';
import IndeterminateHost from './IndeterminateHost.jsx';

export default {
  title: 'Django/USX/Switch',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'switch' });

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
export const ErrorWithoutFormGroup = createStory(storyDefs.ErrorWithoutFormGroup);
export const Success = createStory(storyDefs.Success);
export const AriaLabel = createStory(storyDefs.AriaLabel);
export const CustomClass = createStory(storyDefs.CustomClass);
const indeterminateStory = createStory(storyDefs.Indeterminate);
export const Indeterminate = {
  ...indeterminateStory,
  render: (args, context) => (
    <IndeterminateHost idSuffix={args.id}>
      {indeterminateStory.render(args, context)}
    </IndeterminateHost>
  ),
};
export const ColorSuccess = createStory(storyDefs.ColorSuccess);
export const ColorWarning = createStory(storyDefs.ColorWarning);
export const ColorError = createStory(storyDefs.ColorError);
export const ColorSecondaryTile = createStory(storyDefs.ColorSecondaryTile);
export const ColorAccentCool = createStory(storyDefs.ColorAccentCool);
export const ColorDisabledChecked = createStory(storyDefs.ColorDisabledChecked);
