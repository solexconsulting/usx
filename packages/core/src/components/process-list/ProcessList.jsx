import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './process-list.scss';

function renderContent(content) {
  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return content;
}

export default function ProcessList({ items = [], className = '', ...props }) {
  const classes = ClassNames('usa-process-list', 'usx-process-list', className);
  return (
    <ol className={classes} {...props}>
      {items.map((item, index) => {
        const HeadingTag = item.headingTag || 'h4';
        return (
          <li key={index} className={ClassNames('usa-process-list__item', item.className)}>
            <HeadingTag className={ClassNames('usa-process-list__heading', item.headingClassName)}>
              {item.heading}
            </HeadingTag>
            {item.body && (
              typeof item.body === 'string' || (item.bodyClassName) ? (
                <p className={ClassNames(item.bodyClassName)}>
                  {renderContent(item.body)}
                </p>
              ) : (
                renderContent(item.body)
              )
            )}
          </li>
        );
      })}
    </ol>
  );
}

ProcessList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string.isRequired,
    headingTag: PropTypes.oneOf(['h2', 'h3', 'h4', 'h5', 'h6', 'p']),
    headingClassName: PropTypes.string,
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    bodyClassName: PropTypes.string,
    className: PropTypes.string,
  })),
  className: PropTypes.string,
};

