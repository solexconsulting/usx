import React from 'react';
import classNames from 'classnames';
import Tag, { TagProps } from '../tag/Tag';
import './tag-group.scss';

export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  tags?: TagProps[] | null;
  children?: React.ReactNode;
  className?: string;
}

const TagGroup: React.FC<TagGroupProps> = ({
  tags = null,
  children = null,
  className = '',
  ...props
}) => {
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
};

export default TagGroup;
