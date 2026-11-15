import React from 'react';
import classNames from 'classnames';
import Avatar, { AvatarProps } from '../avatar/Avatar';

export interface AvatarGroupAvatar extends AvatarProps {
  initials?: string;
  initialsClassName?: string;
}

export interface AvatarGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  avatarProps?: AvatarGroupAvatar[];
  overlap?: boolean;
  stacked?: boolean;
  className?: string;
  children?: never;
}

export default function AvatarGroup({
  avatarProps = [],
  overlap = false,
  stacked = false,
  className = '',
  ...props
}: AvatarGroupProps) {
  const classes = classNames(
    'usx-avatar-group',
    overlap && 'usx-avatar-group--overlap',
    stacked && 'usx-avatar-group--stacked',
    className
  );

  return (
    <div className={classes} {...props}>
      {avatarProps.map(({ initials, initialsClassName, ...avatar }, index) => (
        <Avatar
          key={`${avatar.src || avatar.value || initials || 'avatar'}-${index}`}
          {...avatar}
          variant={avatar.variant ?? (avatar.src ? 'image' : 'initials')}
          value={avatar.value ?? initials}
          contentClassName={avatar.contentClassName ?? initialsClassName}
        />
      ))}
    </div>
  );
}
