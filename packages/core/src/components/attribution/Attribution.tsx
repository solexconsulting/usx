import React from 'react';
import classNames from 'classnames';
import Avatar, { AvatarProps } from '../avatar/Avatar';

export interface AttributionProps extends React.HTMLAttributes<HTMLDivElement> {
  avatarProps?: AvatarProps | null;
  media?: React.ReactNode | null;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function Attribution({
  avatarProps = null,
  media = null,
  primary,
  secondary,
  children = null,
  className = '',
  ...props
}: AttributionProps) {
  const classes = classNames('usx-attribution', className);
  const mediaContent = avatarProps ? <Avatar {...avatarProps} /> : media;
  const content = children ?? (
    <>
      {mediaContent && <span className="usx-attribution__media">{mediaContent}</span>}
      <span className="usx-attribution__content">
        <span className="usx-attribution__primary">{primary}</span>
        <span className="usx-attribution__secondary">{secondary}</span>
      </span>
    </>
  );

  return (
    <div className={classes} {...props}>
      {content}
    </div>
  );
}
