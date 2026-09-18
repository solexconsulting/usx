import React, { ReactNode, HTMLAttributes } from 'react';
import ClassNames from 'classnames';

export type ListItem =
  | ReactNode
  | {
      content?: ReactNode;
      children?: ListItem[];
      ordered?: boolean;
      unstyled?: boolean;
      className?: string;
    };

function isItemObject(item: ListItem): item is Exclude<ListItem, ReactNode> {
  return (
    item &&
    typeof item === 'object' &&
    !Array.isArray(item) &&
    !React.isValidElement(item)
  );
}

function renderItems(items: ListItem[] = [], parentOptions: { ordered?: boolean; unstyled?: boolean } = {}) {
  return items.map((item, index) => {
    const objectItem = isItemObject(item);
    const content = objectItem && Object.prototype.hasOwnProperty.call(item, 'content')
      ? item.content
      : item;
    const children = objectItem && Array.isArray(item.children) ? item.children : [];
    const childOrdered = objectItem && typeof item.ordered === 'boolean'
      ? item.ordered
      : parentOptions.ordered;
    const childUnstyled = objectItem && typeof item.unstyled === 'boolean'
      ? item.unstyled
      : parentOptions.unstyled;
    const childClassName = objectItem && typeof item.className === 'string'
      ? item.className
      : '';
    const ChildTag = childOrdered ? 'ol' : 'ul';

    const childClasses = ClassNames(
      'usa-list',
      'usx-list',
      childUnstyled && 'usa-list--unstyled',
      childClassName,
    );

    return (
      <li key={index}>
        {content}
        {children.length > 0 && (
          <ChildTag className={childClasses}>
            {renderItems(children, { ordered: childOrdered, unstyled: childUnstyled })}
          </ChildTag>
        )}
      </li>
    );
  });
}

export interface ListProps extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  items?: ListItem[];
  ordered?: boolean;
  unstyled?: boolean;
  className?: string;
}

export default function List({ items = [], ordered = false, unstyled = false, className = '', ...props }: ListProps) {
  const classes = ClassNames(
    'usa-list',
    'usx-list',
    unstyled && 'usa-list--unstyled',
    className,
  );
  const Tag = ordered ? 'ol' : 'ul';

  return (
    <Tag className={classes} {...props}>
      {renderItems(items, { ordered, unstyled })}
    </Tag>
  );
}
