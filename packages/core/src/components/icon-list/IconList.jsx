import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Icon from '../icon/Icon.jsx';
import './icon-list.scss';

function renderContent(content) {
  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return content;
}

export default function IconList({ items = [], primary = false, size = null, className = '', ...props }) {
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

IconList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    iconName: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    iconClassName: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    itemClassName: PropTypes.string,
    contentClassName: PropTypes.string,
  })),
  primary: PropTypes.bool,
  size: PropTypes.oneOf([null, 'lg']),
  className: PropTypes.string,
};
