import React from 'react';
import classNames from 'classnames';
import Tag, { TagProps } from '../tag/Tag';

export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  tagProps?: TagProps[] | null;
  children?: React.ReactNode;
  className?: string;
  extraAttributes?: Record<string, unknown>;
}

const TagGroup: React.FC<TagGroupProps> = ({
  tagProps = null,
  children = null,
  className = '',
  extraAttributes = {},
  ...props
}) => {
  const classes = classNames('usx-tag-group', className);
  const content = children
    ? children
    : Array.isArray(tagProps)
      ? tagProps.map((t, i) => <Tag key={t.id || t.value || i} {...t} />)
      : null;
  return (
    <div {...props} {...extraAttributes} className={classes}>
      {content}
    </div>
  );
};

export default TagGroup;
