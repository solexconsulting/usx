import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './list.scss';

const isItemObject = (item) => (
  item &&
  typeof item === 'object' &&
  !Array.isArray(item) &&
  !React.isValidElement(item)
);

const renderItems = (items = [], parentOptions = {}) => (
  items.map((item, index) => {
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
  })
);

export default function List({ items = [], ordered = false, unstyled = false, className = '', ...props }) {
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

const listItemShape = PropTypes.shape({
  content: PropTypes.node,
  children: PropTypes.array,
  ordered: PropTypes.bool,
  unstyled: PropTypes.bool,
  className: PropTypes.string,
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node,
      listItemShape,
    ])
  ),
  ordered: PropTypes.bool,
  unstyled: PropTypes.bool,
  className: PropTypes.string,
};
