import React from 'react';
import config from '../../../../core/src/components/button/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Button.React.stories.jsx';

export default {
  title: 'Django/USWDS/Button',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'button' });
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const Default = createStory(toDjangoArgs(storyDefs.Default));
export const DefaultHover = createStory(toDjangoArgs(storyDefs.DefaultHover));
export const DefaultActive = createStory(toDjangoArgs(storyDefs.DefaultActive));
export const DefaultFocus = createStory(toDjangoArgs(storyDefs.DefaultFocus));
export const DefaultDisabled = createStory(toDjangoArgs(storyDefs.DefaultDisabled));
export const DefaultAriaDisabled = createStory(toDjangoArgs(storyDefs.DefaultAriaDisabled));
export const DefaultUnstyled = createStory(toDjangoArgs(storyDefs.DefaultUnstyled));

export const Secondary = createStory(toDjangoArgs(storyDefs.Secondary));
export const SecondaryHover = createStory(toDjangoArgs(storyDefs.SecondaryHover));
export const SecondaryActive = createStory(toDjangoArgs(storyDefs.SecondaryActive));
export const SecondaryFocus = createStory(toDjangoArgs(storyDefs.SecondaryFocus));
export const SecondaryDisabled = createStory(toDjangoArgs(storyDefs.SecondaryDisabled));
export const SecondaryAriaDisabled = createStory(toDjangoArgs(storyDefs.SecondaryAriaDisabled));

export const AccentCool = createStory(toDjangoArgs(storyDefs.AccentCool));
export const AccentCoolHover = createStory(toDjangoArgs(storyDefs.AccentCoolHover));
export const AccentCoolActive = createStory(toDjangoArgs(storyDefs.AccentCoolActive));
export const AccentCoolFocus = createStory(toDjangoArgs(storyDefs.AccentCoolFocus));
export const AccentCoolDisabled = createStory(toDjangoArgs(storyDefs.AccentCoolDisabled));
export const AccentCoolAriaDisabled = createStory(toDjangoArgs(storyDefs.AccentCoolAriaDisabled));

export const AccentWarm = createStory(toDjangoArgs(storyDefs.AccentWarm));
export const AccentWarmHover = createStory(toDjangoArgs(storyDefs.AccentWarmHover));
export const AccentWarmActive = createStory(toDjangoArgs(storyDefs.AccentWarmActive));
export const AccentWarmFocus = createStory(toDjangoArgs(storyDefs.AccentWarmFocus));
export const AccentWarmDisabled = createStory(toDjangoArgs(storyDefs.AccentWarmDisabled));
export const AccentWarmAriaDisabled = createStory(toDjangoArgs(storyDefs.AccentWarmAriaDisabled));

export const Base = createStory(toDjangoArgs(storyDefs.Base));
export const BaseHover = createStory(toDjangoArgs(storyDefs.BaseHover));
export const BaseActive = createStory(toDjangoArgs(storyDefs.BaseActive));
export const BaseFocus = createStory(toDjangoArgs(storyDefs.BaseFocus));
export const BaseDisabled = createStory(toDjangoArgs(storyDefs.BaseDisabled));
export const BaseAriaDisabled = createStory(toDjangoArgs(storyDefs.BaseAriaDisabled));

export const Outline = createStory(toDjangoArgs(storyDefs.Outline));
export const OutlineHover = createStory(toDjangoArgs(storyDefs.OutlineHover));
export const OutlineActive = createStory(toDjangoArgs(storyDefs.OutlineActive));
export const OutlineFocus = createStory(toDjangoArgs(storyDefs.OutlineFocus));
export const OutlineDisabled = createStory(toDjangoArgs(storyDefs.OutlineDisabled));
export const OutlineAriaDisabled = createStory(toDjangoArgs(storyDefs.OutlineAriaDisabled));
export const OutlineInverse = createStory(toDjangoArgs(storyDefs.OutlineInverse));
export const OutlineInverseHover = createStory(toDjangoArgs(storyDefs.OutlineInverseHover));
export const OutlineInverseActive = createStory(toDjangoArgs(storyDefs.OutlineInverseActive));
export const OutlineInverseFocus = createStory(toDjangoArgs(storyDefs.OutlineInverseFocus));
export const OutlineInverseDisabled = createStory(toDjangoArgs(storyDefs.OutlineInverseDisabled));
export const OutlineInverseAriaDisabled = createStory(toDjangoArgs(storyDefs.OutlineInverseAriaDisabled));

export const Big = createStory(toDjangoArgs(storyDefs.Big));
export const BigDisabled = createStory(toDjangoArgs(storyDefs.BigDisabled));
export const BigAriaDisabled = createStory(toDjangoArgs(storyDefs.BigAriaDisabled));
export const BigUnstyled = createStory(toDjangoArgs(storyDefs.BigUnstyled));

export const Ghost = createStory(toDjangoArgs(storyDefs.Ghost));
export const GhostPrimary = createStory(toDjangoArgs(storyDefs.GhostPrimary));
export const GhostSecondary = createStory(toDjangoArgs(storyDefs.GhostSecondary));
export const GhostAccentCool = createStory(toDjangoArgs(storyDefs.GhostAccentCool));
export const GhostAccentWarm = createStory(toDjangoArgs(storyDefs.GhostAccentWarm));
export const GhostBase = createStory(toDjangoArgs(storyDefs.GhostBase));
export const GhostInverse = {
  ...createStory(toDjangoArgs(storyDefs.GhostInverse)),
  render: (args) => (
    <div style={{ backgroundColor: '#333', padding: '1rem' }}>
      {createStory(toDjangoArgs(storyDefs.GhostInverse)).render(args)}
    </div>
  )
};
export const GhostDisabled = createStory(toDjangoArgs(storyDefs.GhostDisabled));
export const GhostAriaDisabled = createStory(toDjangoArgs(storyDefs.GhostAriaDisabled));
export const GhostWithIcon = createStory(toDjangoArgs(storyDefs.GhostWithIcon));

export const MultipleIcons = createStory(toDjangoArgs(storyDefs.MultipleIcons));
export const Loading = createStory(toDjangoArgs(storyDefs.Loading));
export const LoadingDisabled = createStory(toDjangoArgs(storyDefs.LoadingDisabled));
