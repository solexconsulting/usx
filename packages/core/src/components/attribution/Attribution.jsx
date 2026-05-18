import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from '../avatar/Avatar';
import './attribution.scss';

export default function Attribution({
  avatar = null,
  media = null,
  primary,
  secondary,
  children = null,
  className = '',
  ...props
}) {
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

Attribution.propTypes = {
  avatar: PropTypes.shape({
    href: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    variant: PropTypes.oneOf(['image', 'initials', 'icon']),
    value: PropTypes.string,
    shape: PropTypes.oneOf([null, 'circle', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl']),
    tooltip: PropTypes.string,
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    contentClassName: PropTypes.string,
  }),
  media: PropTypes.node,
  primary: PropTypes.node,
  secondary: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};
