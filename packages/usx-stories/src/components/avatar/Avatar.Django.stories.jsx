// import React from 'react';
import config from '../../../../usx-react/src/components/avatar/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Avatar.React.stories.jsx';

export default {
  title: 'Django/USX/Avatar',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  parameters: {
    docs: {
      description: {
        component:
          'Set `statusRingColor` to an existing border utility color name and `statusLabel` to the host’s exact state. The label is included in the accessible name even without a ring. Pass `tooltipProps` with the label to display it on hover. Show visible status text nearby when the state matters.',
      },
    },
  },
};

const createStory = createDjangoStory({ componentName: 'avatar' });
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) =>
  Object.fromEntries(Object.entries(args).filter(([key]) => allowedPropNames.has(key)));

export const Default = createStory(toDjangoArgs(storyDefs.Default));
export const CircleAvatar = createStory(toDjangoArgs(storyDefs.CircleAvatar));
export const MediumRoundedAvatar = createStory(toDjangoArgs(storyDefs.MediumRoundedAvatar));
export const LargeRoundedAvatar = createStory(toDjangoArgs(storyDefs.LargeRoundedAvatar));
export const AvatarWithTooltip = createStory(toDjangoArgs(storyDefs.AvatarWithTooltip));
export const AvatarWithCustomTooltip = createStory(toDjangoArgs(storyDefs.AvatarWithCustomTooltip));
export const InitialsAvatar = createStory(toDjangoArgs(storyDefs.InitialsAvatar));
export const NonInteractive = createStory(toDjangoArgs(storyDefs.NonInteractive));
export const InitialsAvatarSmall = createStory(toDjangoArgs(storyDefs.InitialsAvatarSmall));
export const ImageAvatarMedium = createStory(toDjangoArgs(storyDefs.ImageAvatarMedium));
export const ImageAvatarLarge = createStory(toDjangoArgs(storyDefs.ImageAvatarLarge));
export const ImageAvatarExtraLarge = createStory(toDjangoArgs(storyDefs.ImageAvatarExtraLarge));
export const InitialsAvatarMedium = createStory(toDjangoArgs(storyDefs.InitialsAvatarMedium));
export const InitialsAvatarLarge = createStory(toDjangoArgs(storyDefs.InitialsAvatarLarge));
export const InitialsAvatarExtraLarge = createStory(
  toDjangoArgs(storyDefs.InitialsAvatarExtraLarge)
);
export const IconAvatarPerson = createStory(toDjangoArgs(storyDefs.IconAvatarPerson));
export const IconAvatarSupportAgent = createStory(toDjangoArgs(storyDefs.IconAvatarSupportAgent));
export const IconAvatarSentiment = createStory(toDjangoArgs(storyDefs.IconAvatarSentiment));
export const IconAvatarLarge = createStory(toDjangoArgs(storyDefs.IconAvatarLarge));
export const StatusSuccess = createStory(toDjangoArgs(storyDefs.StatusSuccess));
export const StatusCaution = createStory(toDjangoArgs(storyDefs.StatusCaution));
export const StatusDanger = createStory(toDjangoArgs(storyDefs.StatusDanger));
export const StatusNeutral = createStory(toDjangoArgs(storyDefs.StatusNeutral));
export const StatusInfo = createStory(toDjangoArgs(storyDefs.StatusInfo));
export const StatusSpecial = createStory(toDjangoArgs(storyDefs.StatusSpecial));
export const StatusWarning = createStory(toDjangoArgs(storyDefs.StatusWarning));
export const StatusSecondaryColor = createStory(toDjangoArgs(storyDefs.StatusSecondaryColor));
export const StatusLabelOnly = createStory(toDjangoArgs(storyDefs.StatusLabelOnly));
