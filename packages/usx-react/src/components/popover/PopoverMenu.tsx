import React from 'react';
import ClassNames from 'classnames';
import Link from '../link/Link';
import type { SummaryProps } from '../summary/Summary';
import Popover from './Popover';

interface PopoverMenuItemBase {
  /** Unique ID for the item's panel. Defaults to `${prefix}-${index}`. */
  id?: string;
}

export interface PopoverMenuLinkItem extends PopoverMenuItemBase {
  type: 'link';
  href: string;
  text: string;
}

export interface PopoverMenuDetailsItem extends PopoverMenuItemBase {
  type: 'details';
  /** Summary options; the nested items open in a Popover to the right. */
  summaryProps: Omit<SummaryProps, 'unstyled'>;
  items: PopoverMenuItem[];
}

export interface PopoverMenuTextItem extends PopoverMenuItemBase {
  type: 'text';
  text: string;
}

export type PopoverMenuItem = PopoverMenuLinkItem | PopoverMenuDetailsItem | PopoverMenuTextItem;

export interface PopoverMenuProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  /** Links, nested menus, or plain text. */
  items: PopoverMenuItem[];
  /** Prefix for generated panel IDs and the native details group name. Generated if omitted. */
  prefix?: string;
  children?: never;
}

/** A stacked list of rows; `details` items open nested PopoverMenus beside their row. */
export default function PopoverMenu({ items, prefix, className, ...props }: PopoverMenuProps) {
  const generatedPrefix = React.useId();
  const base = prefix ?? generatedPrefix;

  return (
    <ul {...props} className={ClassNames('usx-popover__menu', className)}>
      {items.map((item, index) => {
        const id = item.id ?? `${base}-${index}`;

        return (
          <li key={id}>
            {item.type === 'details' && (
              <Popover
                id={id}
                summaryProps={{
                  ...item.summaryProps,
                  className: ClassNames(item.summaryProps.className, 'usx-popover__menu-item'),
                }}
                name={base}
                side="right"
                menuItems={item.items}
              />
            )}
            {item.type === 'link' && (
              <Link
                href={item.href}
                text={item.text}
                className="usx-no-visited usx-popover__menu-item"
              />
            )}
            {item.type === 'text' && <span className="usx-popover__menu-item">{item.text}</span>}
          </li>
        );
      })}
    </ul>
  );
}
