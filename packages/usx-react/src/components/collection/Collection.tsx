import React from 'react';
import ClassNames from 'classnames';
import CalendarDate from '../calendar-date/CalendarDate';

export interface CollectionMetaItem {
  text: string;
  datetime?: string;
}

export interface CollectionTag {
  label: string;
  isNew?: boolean;
}

export interface CollectionItemProps {
  href: string;
  heading: string;
  description?: string;
  imgSrc?: string;
  imgAlt?: string;
  calendarDate?: string | { datetime: string; month: string; day: string };
  meta?: (string | CollectionMetaItem)[];
  tags?: (string | CollectionTag)[];
}

function CollectionItem({ href, heading, description, imgSrc, imgAlt = '', calendarDate, meta, tags }: CollectionItemProps) {
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
              typeof item === 'object' && 'datetime' in item ? (
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

export interface CollectionProps extends React.HTMLAttributes<HTMLUListElement> {
  items?: CollectionItemProps[];
  condensed?: boolean;
  className?: string;
}

export default function Collection({ items = [], condensed = false, className = '', ...props }: CollectionProps) {
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
