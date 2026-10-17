import React from 'react';
import ClassNames from 'classnames';
import Button from '../button/Button';
import Summary, { type SummaryProps } from '../summary/Summary';
import PopoverMenu, { type PopoverMenuItem } from './PopoverMenu';

export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
export type PopoverAlign = 'start' | 'center' | 'end';

export interface PopoverProps extends Omit<
  React.DetailsHTMLAttributes<HTMLDetailsElement>,
  'children' | 'open'
> {
  /** Unique ID for the panel, also used by close controls. */
  id: string;
  /** Physical side of the trigger where CSS places the floating panel. */
  side?: PopoverSide;
  /** Alignment along that side; start and end follow reading direction above/below. */
  align?: PopoverAlign;
  /** Open on the initial render. Native details owns subsequent disclosure state. */
  defaultOpen?: boolean;
  /** Optional native details group. Use a different name at each nesting level. */
  name?: string;
  /** Arbitrary semantic content. Use native links, buttons, lists, or form controls. */
  children?: React.ReactNode;
  /** Renders a PopoverMenu of links and nested flyouts in the panel, before any children. */
  menuItems?: PopoverMenuItem[];
  showClose?: boolean;
  closeLabel?: string;
  /** Optional visible heading for the panel. */
  panelHeading?: string;
  /** Heading element for panelHeading, chosen to fit the surrounding page outline. */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /** Adds a bounded, scrollable area around the children. */
  scrollable?: boolean;
  /** Props passed to the internal Summary. Popover leaves the summary unstyled. */
  summaryProps?: Omit<SummaryProps, 'unstyled'>;
  panelClassName?: string;
  /** Optional class name for the inner content container. */
  contentClassName?: string;
}

/**
 * A dismissible disclosure for contextual content, navigation, and actions.
 * Use Details for optional supporting content without popover dismissal behavior.
 */
export default function Popover({
  id,
  side = 'bottom',
  align = 'start',
  defaultOpen = false,
  menuItems,
  showClose = false,
  closeLabel = 'Close',
  panelHeading,
  headingLevel = 'h2',
  scrollable = false,
  className,
  summaryProps,
  panelClassName,
  contentClassName,
  children,
  ...props
}: PopoverProps) {
  const [initiallyOpen] = React.useState(defaultOpen);
  const composedSummaryProps = { ...summaryProps, label: summaryProps?.label ?? 'Open panel' };
  const Heading = headingLevel;

  return (
    <details
      {...props}
      className={ClassNames('usx-popover', className)}
      open={initiallyOpen || undefined}
      data-side={side}
      data-align={align}
    >
      <Summary unstyled {...composedSummaryProps} />
      <div id={id} className={ClassNames('usx-popover__panel', panelClassName)}>
        {panelHeading && <Heading className="usx-popover__panel-heading">{panelHeading}</Heading>}
        {menuItems && <PopoverMenu items={menuItems} prefix={id} />}
        {children && (
          <div
            className={ClassNames(
              'usx-popover__panel-content',
              { 'usx-popover__scroll': scrollable },
              contentClassName
            )}
          >
            {children}
          </div>
        )}
        {showClose && (
          <Button
            variant="unstyled"
            className="usx-popover__panel-close"
            data-usx-popover-close={id}
          >
            {closeLabel}
          </Button>
        )}
      </div>
    </details>
  );
}
