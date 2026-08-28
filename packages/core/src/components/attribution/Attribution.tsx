import React from 'react';
import classNames from 'classnames';
import Avatar from '../avatar/Avatar';

export interface AttributionAvatarProps {
  href?: string;
  src?: string;
  alt?: string;
  variant?: 'image' | 'initials' | 'icon';
  value?: string;
  shape?: null | 'circle' | 'rounded-sm' | 'rounded-md' | 'rounded-lg' | 'rounded-xl';
  tooltip?: string;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
}

export interface AttributionProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: AttributionAvatarProps | null;
  media?: React.ReactNode | null;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function Attribution({
  avatar = null,
  media = null,
  primary,
  secondary,
  children = null,
  className = '',
  ...props
}: AttributionProps) {
  const classes = classNames('usx-attribution', className);
  const mediaContent = avatar ? <Avatar {...avatar} /> : media;
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
