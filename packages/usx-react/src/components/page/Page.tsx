import React from 'react';
import ClassNames from 'classnames';
import TagGroup from '../tag-group/TagGroup';
import type { TagProps } from '../tag/Tag';

export interface PageProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'content'> {
  title?: React.ReactNode;
  titleId?: string;
  eyebrow?: React.ReactNode;
  subtitle?: string;
  description?: string;
  tagProps?: TagProps[];
  as?: 'main' | 'div' | 'section' | 'article';
  content?: React.ReactNode;
  tabIndex?: number;
  ariaLabelledby?: string;
}

export default function Page({
  id = undefined,
  title = 'Page title',
  titleId = undefined,
  eyebrow = null,
  subtitle = undefined,
  description = undefined,
  tagProps = undefined,
  as: Element = 'main',
  children = null,
  content = null,
  tabIndex = undefined,
  ariaLabelledby = undefined,
  className = '',
  ...props
}: PageProps) {
  const hasSummary = Boolean(subtitle || description || tagProps?.length);
  const classes = ClassNames('usx-page', className);
  const pageContent = children || content;

  const labelledBy = ariaLabelledby || titleId || undefined;

  return (
    <Element
      id={id}
      className={classes}
      tabIndex={tabIndex}
      aria-labelledby={labelledBy}
      {...props}
    >
      <h1 id={titleId} className="usx-page__title">
        {eyebrow ? <span className="usx-eyebrow">{eyebrow}</span> : null}
        {title}
      </h1>
      {hasSummary && (
        <div className="usx-page__summary">
          {subtitle && <p className="usx-page__subtitle">{subtitle}</p>}
          {tagProps?.length ? <TagGroup className="usx-page__tags" tagProps={tagProps} /> : null}
          {description && <p className="usx-page__description">{description}</p>}
        </div>
      )}
      <div className="usx-page__content">{pageContent}</div>
    </Element>
  );
}
