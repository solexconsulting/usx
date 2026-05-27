import React from 'react';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';
import './icon-list.scss';

export interface IconListItem {
  iconName: string;
  iconColor?: string;
  iconSize?: number;
  iconClassName?: string;
  title?: string;
  content: string | React.ReactNode;
  itemClassName?: string;
  contentClassName?: string;
}

export interface IconListProps extends React.HTMLAttributes<HTMLUListElement> {
  items?: IconListItem[];
  primary?: boolean;
  size?: null | 'lg';
  className?: string;
}

function renderContent(content: string | React.ReactNode) {
  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return content;
}

export default function IconList({ items = [], primary = false, size = null, className = '', ...props }: IconListProps) {
  const classes = ClassNames(
    'usa-icon-list',
    'usx-icon-list',
    primary && 'usa-icon-list--primary',
    size === 'lg' && 'usa-icon-list--size-lg',
    className,
  );

  return (
    <ul className={classes} {...props}>
      {items.map((item, index) => (
        <li key={index} className={ClassNames('usa-icon-list__item', item.itemClassName)}>
          <div className={ClassNames('usa-icon-list__icon', item.iconColor && `text-${item.iconColor}`, item.iconClassName)}>
            <Icon
              name={item.iconName}
              color={item.iconColor}
              size={item.iconSize}
              className={item.iconClassName}
            />
          </div>
          <div className={ClassNames('usa-icon-list__content', item.contentClassName)}>
            {item.title ? <h4 className="usa-icon-list__title">{item.title}</h4> : null}
            {renderContent(item.content)}
          </div>
        </li>
      ))}
    </ul>
  );
}
