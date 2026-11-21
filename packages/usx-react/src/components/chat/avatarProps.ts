import ClassNames from 'classnames';
import type { AvatarProps } from '../avatar/Avatar';
import type { AvatarGroupAvatar } from '../avatar-group/AvatarGroup';
import type { ChatParticipant } from './Chat';

export default function chatAvatarProps(
  participant: ChatParticipant | undefined,
  name: string,
  statusRingColor?: AvatarProps['statusRingColor'],
  statusLabel?: AvatarProps['statusLabel'],
  tooltipProps?: AvatarProps['tooltipProps']
): AvatarGroupAvatar {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => Array.from(part)[0] || '')
    .join('')
    .toUpperCase();
  return {
    variant: 'initials',
    value: initials,
    alt: name,
    shape: 'circle',
    contentClassName: 'bg-primary-light text-inverse',
    ...participant?.avatarProps,
    statusRingColor: statusRingColor ?? participant?.avatarProps?.statusRingColor,
    statusLabel: statusLabel ?? participant?.avatarProps?.statusLabel,
    tooltipProps: tooltipProps ?? participant?.avatarProps?.tooltipProps,
    className: ClassNames('usx-chat__avatar', participant?.avatarProps?.className),
  };
}
