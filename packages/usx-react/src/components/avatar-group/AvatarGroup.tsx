import React from 'react';
import classNames from 'classnames';
import Avatar, { AvatarProps } from '../avatar/Avatar';

export interface AvatarGroupAvatar extends Omit<AvatarProps, 'variant'> {
  initials?: string;
  initialsClassName?: string;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatarProps?: AvatarGroupAvatar[];
  overlap?: boolean;
  stacked?: boolean;
  className?: string;
}

export default function AvatarGroup({ avatarProps = [], overlap = false, stacked = false, className = '', ...props }: AvatarGroupProps) {
  const classes = classNames(
    'usx-avatar-group',
    overlap && 'usx-avatar-group--overlap',
    stacked && 'usx-avatar-group--stacked',
    className,
  );

  return (
    <div className={classes} {...props}>
      {avatarProps.map((avatar, index) => (
        <Avatar
          key={`${avatar.src || avatar.initials || 'avatar'}-${index}`}
          href={avatar.href}
          src={avatar.src}
          alt={avatar.alt}
          value={avatar.initials}
          shape={avatar.shape}
          tooltipProps={avatar.tooltipProps}
          className={avatar.className}
          imageClassName={avatar.imageClassName}
          contentClassName={avatar.initialsClassName}
        />
      ))}
    </div>
  );
}
