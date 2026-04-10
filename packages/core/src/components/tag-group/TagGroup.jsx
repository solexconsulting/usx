import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Tag from '../tag/Tag';
import './tag-group.scss';

export default function TagGroup({
  tags = null,
  children = null,
  className = '',
  ...props
}) {
  const classes = classNames(
    'usx-tag-group',
    className
  );

  const content = children
    ? children
    : Array.isArray(tags)
    ? tags.map((t, i) => (
        <Tag key={t.id || t.value || i} {...t} />
      ))
    : null;

  return (
    <div className={classes} {...props}>
      {content}
    </div>
  );
}

TagGroup.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node,
  className: PropTypes.string,
};
