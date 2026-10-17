import React from 'react';
import ClassNames from 'classnames';
import Details, { type DetailsProps } from '../details/Details';
import Link, { type LinkProps } from '../link/Link';

export type TreeLinkItem = Omit<LinkProps, 'children' | 'href' | 'text' | 'type'> & {
  type: 'link';
  href: string;
  text: string;
};

/** A Details whose content is a nested Tree. */
export type TreeBranchItem = Omit<DetailsProps, 'children' | 'text'> & {
  type: 'details';
  items: TreeItem[];
  text?: never;
};

/** A Details whose content is a paragraph of text. */
export type TreeDetailsItem = Omit<DetailsProps, 'children' | 'text'> & {
  type: 'details';
  text: string;
  items?: never;
};

export type TreeTextItem = {
  type: 'text';
  text: string;
};

export type TreeItem = TreeLinkItem | TreeBranchItem | TreeDetailsItem | TreeTextItem;
export type TreeVariant = 'raw' | 'padded';

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  /** Each item sets `type` to "link", "details", or "text". */
  items: TreeItem[];
  /** Raw preserves Details styling; padded adds row spacing and alignment. */
  variant?: TreeVariant;
  children?: never;
}

/** A semantic nested list built from Link and Details items. */
export default function Tree({ items, variant = 'raw', className, ...props }: TreeProps) {
  return (
    <ul {...props} className={ClassNames('usx-tree', `usx-tree--${variant}`, className)}>
      {items.map((item, index) => {
        switch (item.type) {
          case 'link': {
            const { type, ...linkProps } = item;
            return (
              <li key={index}>
                <Link {...linkProps} />
              </li>
            );
          }
          case 'details': {
            const { type, items: nestedItems, className: detailsClassName, ...detailsProps } = item;
            return (
              <li key={index}>
                {nestedItems ? (
                  <Details
                    {...detailsProps}
                    className={ClassNames('usx-tree__branch', detailsClassName)}
                  >
                    <Tree items={nestedItems} variant={variant} />
                  </Details>
                ) : (
                  <Details {...detailsProps} className={detailsClassName} />
                )}
              </li>
            );
          }
          case 'text':
            return (
              <li key={index}>
                <span className="usx-tree__label">{item.text}</span>
              </li>
            );
          default:
            return null;
        }
      })}
    </ul>
  );
}
