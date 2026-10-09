import React from 'react';
import ClassNames from 'classnames';
import Callout, { type CalloutProps } from '../callout/Callout';
import Attribution, { type AttributionProps } from '../attribution/Attribution';
import Icon from '../icon/Icon';
import Link, { type LinkProps } from '../link/Link';

export interface QuoteProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content'> {
  className?: string;
  calloutProps?: Omit<CalloutProps, 'element' | 'children' | 'content' | 'cite'>;
  attributionProps?: AttributionProps;
  children?: React.ReactNode;
  content?: React.ReactNode;
  sourceLinkProps?: Omit<LinkProps, 'children'>;
  sourceTitle?: React.ReactNode;
  blockquoteClassName?: string;
}

export default function Quote({
  calloutProps,
  attributionProps,
  children,
  content,
  sourceLinkProps,
  sourceTitle,
  className,
  blockquoteClassName,
  ...props
}: QuoteProps) {
  const isVertical = calloutProps?.orientation === 'vertical';
  return (
    <div className={ClassNames('usx-quote', isVertical && 'usx-quote--vertical', className)} {...props}>
      {!isVertical && <Icon name="format_quote" size={4} className="usx-quote__icon" />}
      <Callout {...calloutProps} element="div">
        <figure className="usx-quote__body">
          <blockquote
            className={ClassNames('usx-quote__content', blockquoteClassName)}
            cite={sourceLinkProps?.href}
          >
            {isVertical && '❝'}
            {children ?? content}
            {isVertical && '❞'}
          </blockquote>
          {(attributionProps || sourceTitle) && (
            <figcaption className="usx-quote__attribution">
              {attributionProps && <Attribution {...attributionProps} />}
              {sourceTitle && (
                <cite>
                  {sourceLinkProps ? <Link {...sourceLinkProps}>{sourceTitle}</Link> : sourceTitle}
                </cite>
              )}
            </figcaption>
          )}
        </figure>
      </Callout>
    </div>
  );
}
