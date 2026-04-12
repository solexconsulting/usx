import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import CalendarDate from '../calendar-date/CalendarDate';
import './collection.scss';

function CollectionItem({ href, heading, description, imgSrc, imgAlt = '', calendarDate, meta, tags }) {
  return (
    <li className="usa-collection__item">
      {imgSrc && (
        <img className="usa-collection__img" src={imgSrc} alt={imgAlt} />
      )}
      {calendarDate && (
        <CalendarDate datetime={typeof calendarDate === 'string' ? calendarDate : calendarDate.datetime} underCollection={true} />
      )}
      <div className="usa-collection__body">
        <h4 className="usa-collection__heading">
          <a className="usa-link usx-link" href={href}>{heading}</a>
        </h4>
        {description && (
          <p className="usa-collection__description">{description}</p>
        )}
        {meta && meta.length > 0 && (
          <ul className="usa-collection__meta" aria-label="More information">
            {meta.map((item, i) =>
              item.datetime ? (
                <li key={i} className="usa-collection__meta-item">
                  <time dateTime={item.datetime}>{item.text}</time>
                </li>
              ) : (
                <li key={i} className="usa-collection__meta-item">
                  {typeof item === 'string' ? item : item.text}
                </li>
              )
            )}
          </ul>
        )}
        {tags && tags.length > 0 && (
          <ul className="usa-collection__meta" aria-label="Topics">
            {tags.map((tag, i) => (
              <li
                key={i}
                className={ClassNames(
                  'usa-collection__meta-item',
                  'usa-tag usx-tag',
                  typeof tag === 'object' && tag.isNew && 'usa-tag--new',
                )}
              >
                {typeof tag === 'string' ? tag : tag.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default function Collection({ items = [], condensed = false, className = '', ...props }) {
  const classes = ClassNames(
    'usa-collection',
    'usx-collection',
    condensed && 'usa-collection--condensed',
    className,
  );

  return (
    <ul className={classes} {...props}>
      {items.map((item, i) => (
        <CollectionItem key={i} {...item} />
      ))}
    </ul>
  );
}

Collection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    description: PropTypes.string,
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
    calendarDate: PropTypes.shape({
      datetime: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      day: PropTypes.string.isRequired,
    }),
    meta: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ text: PropTypes.string.isRequired, datetime: PropTypes.string }),
    ])),
    tags: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ label: PropTypes.string.isRequired, isNew: PropTypes.bool }),
    ])),
  })),
  condensed: PropTypes.bool,
  className: PropTypes.string,
};