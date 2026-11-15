// import React from 'react';
import Avatar from '../../../../usx-react/src/components/avatar/Avatar.tsx';
import config from '../../../../usx-react/src/components/avatar/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const baseArgs = {
  href: 'https://google.com/search?q=Statue+of+Liberty',
  src: './lady_liberty.png',
  alt: 'Statue of Liberty',
};

export const storyDefs = {
  Default: config.default,
  CircleAvatar: {
    ...baseArgs,
    shape: 'circle',
  },
  MediumRoundedAvatar: {
    ...baseArgs,
    shape: 'rounded-md',
  },
  LargeRoundedAvatar: {
    ...baseArgs,
    shape: 'rounded-lg',
  },
  AvatarWithTooltip: {
    ...baseArgs,
    shape: 'rounded-lg',
    tooltipProps: { label: 'Statue of Liberty', position: 'right' },
  },
  AvatarWithCustomTooltip: {
    ...baseArgs,
    tooltipProps: {
      label: 'Custom tooltip',
      position: 'bottom',
      className: 'avatar-tooltip-wrapper',
      bodyClassName: 'avatar-tooltip-body',
    },
  },
  InitialsAvatar: {
    href: '#',
    variant: 'initials',
    value: 'AB',
    alt: 'Alex Brown',
    contentClassName: 'bg-primary-lighter text-primary-darker',
  },
  NonInteractive: {
    variant: 'initials',
    value: 'MO',
    alt: 'Morgan',
    contentClassName: 'bg-primary-lighter text-primary-darker',
  },
  InitialsAvatarSmall: {
    href: '#',
    variant: 'initials',
    value: 'GW',
    alt: 'George Washington',
    className: 'usx-avatar--size-sm',
    contentClassName: 'bg-primary-lighter text-primary-darker',
  },
  ImageAvatarMedium: {
    ...baseArgs,
    className: 'usx-avatar--size-md',
  },
  ImageAvatarLarge: {
    ...baseArgs,
    className: 'usx-avatar--size-lg',
  },
  ImageAvatarExtraLarge: {
    ...baseArgs,
    className: 'usx-avatar--size-xl',
  },
  InitialsAvatarMedium: {
    href: '#',
    variant: 'initials',
    value: 'AB',
    alt: 'Alex Brown',
    className: 'usx-avatar--size-md',
    contentClassName: 'bg-primary-lighter text-primary-darker',
  },
  InitialsAvatarLarge: {
    href: '#',
    variant: 'initials',
    value: 'AB',
    alt: 'Alex Brown',
    className: 'usx-avatar--size-lg',
    contentClassName: 'bg-primary-lighter text-primary-darker',
  },
  InitialsAvatarExtraLarge: {
    href: '#',
    variant: 'initials',
    value: 'AB',
    alt: 'Alex Brown',
    className: 'usx-avatar--size-xl',
    contentClassName: 'bg-primary-lighter text-primary-darker',
  },
  IconAvatarPerson: {
    href: '#',
    variant: 'icon',
    value: 'person',
    alt: 'Person',
    contentClassName: 'bg-primary-lighter text-base-darkest',
  },
  IconAvatarSupportAgent: {
    href: '#',
    variant: 'icon',
    value: 'support_agent',
    alt: 'Support Agent',
    contentClassName: 'bg-primary-lighter text-primary-darker',
  },
  IconAvatarSentiment: {
    href: '#',
    variant: 'icon',
    value: 'sentiment_satisfied_alt',
    alt: 'Happy',
    contentClassName: 'bg-primary-lighter text-success-darker',
  },
  IconAvatarLarge: {
    href: '#',
    variant: 'icon',
    value: 'person',
    alt: 'Person',
    className: 'usx-avatar--size-lg',
    contentClassName: 'bg-primary-lighter text-base-darkest',
  },
  StatusSuccess: {
    ...baseArgs,
    shape: 'circle',
    statusRingColor: 'success',
    statusLabel: 'Online',
    tooltipProps: { label: 'Online', position: 'right' },
  },
  StatusCaution: {
    variant: 'initials',
    value: 'AB',
    alt: 'Alex Brown',
    contentClassName: 'bg-primary-lighter text-primary-darker',
    statusRingColor: 'warning',
    statusLabel: 'Pending review',
  },
  StatusDanger: {
    variant: 'icon',
    value: 'person',
    alt: 'Account owner',
    contentClassName: 'bg-primary-lighter text-base-darkest',
    statusRingColor: 'error',
    statusLabel: 'Do not disturb',
  },
  StatusNeutral: {
    ...baseArgs,
    shape: 'rounded-md',
    statusRingColor: 'base',
    statusLabel: 'Offline',
  },
  StatusInfo: {
    ...baseArgs,
    shape: 'circle',
    statusRingColor: 'info',
    statusLabel: 'Verified',
  },
  StatusSpecial: {
    variant: 'icon',
    value: 'person',
    alt: 'Site administrator',
    contentClassName: 'bg-primary-lighter text-base-darkest',
    statusRingColor: 'accent-cool',
    statusLabel: 'Elevated privileges',
  },
  StatusWarning: {
    variant: 'initials',
    value: 'AB',
    alt: 'Alex Brown',
    className: 'usx-avatar--size-sm',
    contentClassName: 'bg-primary-lighter text-primary-darker',
    statusRingColor: 'accent-warm',
    statusLabel: 'Requires action',
  },
  StatusSecondaryColor: {
    ...baseArgs,
    shape: 'circle',
    statusRingColor: 'secondary',
    statusLabel: 'Premium member',
  },
  StatusLabelOnly: {
    variant: 'initials',
    value: 'AB',
    alt: 'Alex Brown',
    contentClassName: 'bg-primary-lighter text-primary-darker',
    statusLabel: 'Available by appointment',
  },
};

export default {
  title: 'React/USX/Avatar',
  component: Avatar,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
  parameters: {
    docs: {
      description: {
        component:
          'Set `statusRingColor` to an existing border utility color name, such as success, warning, error, info, accent-cool, or secondary. Set `statusLabel` to the host’s exact state; Avatar includes it in the accessible name even when no ring is shown. Pass the label in `tooltipProps` to display it on hover. Provide visible status text nearby when the state matters to sighted users.',
      },
    },
  },
};

export const Default = { args: storyDefs.Default };
export const CircleAvatar = { args: storyDefs.CircleAvatar };
export const MediumRoundedAvatar = { args: storyDefs.MediumRoundedAvatar };
export const LargeRoundedAvatar = { args: storyDefs.LargeRoundedAvatar };
export const AvatarWithTooltip = { args: storyDefs.AvatarWithTooltip };
export const AvatarWithCustomTooltip = { args: storyDefs.AvatarWithCustomTooltip };
export const InitialsAvatar = { args: storyDefs.InitialsAvatar };
export const NonInteractive = { args: storyDefs.NonInteractive };
export const InitialsAvatarSmall = { args: storyDefs.InitialsAvatarSmall };
export const ImageAvatarMedium = { args: storyDefs.ImageAvatarMedium };
export const ImageAvatarLarge = { args: storyDefs.ImageAvatarLarge };
export const ImageAvatarExtraLarge = { args: storyDefs.ImageAvatarExtraLarge };
export const InitialsAvatarMedium = { args: storyDefs.InitialsAvatarMedium };
export const InitialsAvatarLarge = { args: storyDefs.InitialsAvatarLarge };
export const InitialsAvatarExtraLarge = { args: storyDefs.InitialsAvatarExtraLarge };
export const IconAvatarPerson = { args: storyDefs.IconAvatarPerson };
export const IconAvatarSupportAgent = { args: storyDefs.IconAvatarSupportAgent };
export const IconAvatarSentiment = { args: storyDefs.IconAvatarSentiment };
export const IconAvatarLarge = { args: storyDefs.IconAvatarLarge };
export const StatusSuccess = { args: storyDefs.StatusSuccess };
export const StatusCaution = { args: storyDefs.StatusCaution };
export const StatusDanger = { args: storyDefs.StatusDanger };
export const StatusNeutral = { args: storyDefs.StatusNeutral };
export const StatusInfo = { args: storyDefs.StatusInfo };
export const StatusSpecial = { args: storyDefs.StatusSpecial };
export const StatusWarning = { args: storyDefs.StatusWarning };
export const StatusSecondaryColor = { args: storyDefs.StatusSecondaryColor };
export const StatusLabelOnly = { args: storyDefs.StatusLabelOnly };
