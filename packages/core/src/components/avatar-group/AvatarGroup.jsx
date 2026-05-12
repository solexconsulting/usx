import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from '../avatar/Avatar.jsx';
import './avatar-group.scss';

export default function AvatarGroup({ avatars = [], overlap = false, stacked = false, className = '', ...props }) {
  const classes = classNames(
    'usa-identifier__logos',
    'usx-avatar-group',
    overlap && 'usa-avatar-group--overlap',
    stacked && 'usa-avatar-group--stacked',
    className,
  );

  return (
    <div className={classes} {...props}>
      {avatars.map((avatar, index) => (
        <Avatar
          key={`${avatar.src || 'avatar'}-${index}`}
          href={avatar.href}
          src={avatar.src}
          alt={avatar.alt}
          shape={avatar.shape}
          tooltip={avatar.tooltip}
          className={avatar.className}
          imageClassName={avatar.imageClassName}
        />
      ))}
    </div>
  );
}

AvatarGroup.propTypes = {
  avatars: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    shape: PropTypes.oneOf([null, 'circle', 'rounded-md', 'rounded-lg']),
    tooltip: PropTypes.string,
    className: PropTypes.string,
    imageClassName: PropTypes.string,
  })),
  overlap: PropTypes.bool,
  stacked: PropTypes.bool,
  className: PropTypes.string,
};
