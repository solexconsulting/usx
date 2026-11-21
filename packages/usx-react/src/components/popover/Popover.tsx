import React from 'react';
import ClassNames from 'classnames';
import Button from '../button/Button';
import Summary, { type SummaryProps } from '../summary/Summary';
import PopoverMenu, { type PopoverMenuItem } from './PopoverMenu';

export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
export type PopoverAlign = 'start' | 'center' | 'end';
export type PopoverPanelShape = 'rounded' | 'square';

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
  /** Panel corners and outer padding. Rounded preserves the original appearance. */
  panelShape?: PopoverPanelShape;
  /** Open on the initial render. Native details owns subsequent disclosure state. */
  defaultOpen?: boolean;
  /** Keep the panel open when focus or pointer moves outside it. Escape and close controls still close it. */
  dismissOnOutside?: boolean;
  /** Optional native details group. Use a different name at each nesting level. */
  name?: string;
  /** Arbitrary semantic content. Use native links, buttons, lists, or form controls. */
  children?: React.ReactNode;
  /** Renders a PopoverMenu of links, actions, and nested flyouts before any children. */
  menuItems?: PopoverMenuItem[];
  showClose?: boolean;
  closeLabel?: string;
  /** Controls before the panel heading, such as a back button. */
  headerLeftActions?: React.ReactNode;
  /** Controls after the panel heading, before the close icon. */
  headerRightActions?: React.ReactNode;
  showCloseIcon?: boolean;
  closeIconLabel?: string;
  headerClassName?: string;
  /** Optional visible heading for the panel. */
  panelHeading?: string;
  /** Optional ID for a heading that labels panel content and can receive programmatic focus. */
  panelHeadingId?: string;
  /** Heading element for panelHeading, chosen to fit the surrounding page outline. */
  headingAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /** Adds a bounded, scrollable area around the children. */
  scrollable?: boolean;
  /** Props passed to the internal Summary. Popover leaves the summary unstyled. */
  summaryProps?: Omit<SummaryProps, 'unstyled'>;
  panelClassName?: string;
  /** Optional class name for the inner content container. */
  contentClassName?: string;
  extraAttributes?: Record<string, unknown>;
}

/**
 * A dismissible disclosure for contextual content, navigation, and actions.
 * Use Details for optional supporting content without popover dismissal behavior.
 */
export default function Popover({
  id,
  side = 'bottom',
  align = 'start',
  panelShape = 'rounded',
  defaultOpen = false,
  dismissOnOutside = true,
  menuItems,
  showClose = false,
  closeLabel = 'Close',
  headerLeftActions,
  headerRightActions,
  showCloseIcon = false,
  closeIconLabel = 'Close',
  headerClassName,
  panelHeading,
  panelHeadingId,
  headingAs = 'h2',
  scrollable = false,
  className,
  summaryProps,
  panelClassName,
  contentClassName,
  extraAttributes,
  children,
  ...props
}: PopoverProps) {
  const composedSummaryProps = { ...summaryProps, label: summaryProps?.label ?? 'Open panel' };
  const Heading = headingAs;

  return (
    <details
      {...props}
      className={ClassNames('usx-popover', className)}
      open={defaultOpen || undefined}
      data-side={side}
      data-align={align}
      data-usx-popover-dismiss-on-outside={dismissOnOutside ? undefined : 'false'}
      {...extraAttributes}
    >
      <Summary unstyled {...composedSummaryProps} />
      <div
        id={id}
        className={ClassNames(
          'usx-popover__panel',
          {
            'usx-popover__panel--square': panelShape === 'square',
          },
          panelClassName
        )}
      >
        {(headerLeftActions || panelHeading || headerRightActions || showCloseIcon) && (
          <header className={ClassNames('usx-popover__header', headerClassName)}>
            {headerLeftActions && (
              <div className="usx-popover__header-left-actions">{headerLeftActions}</div>
            )}
            <div className="usx-popover__header-content">
              {panelHeading && (
                <Heading id={panelHeadingId} className="usx-popover__panel-heading" tabIndex={-1}>
                  {panelHeading}
                </Heading>
              )}
            </div>
            {(headerRightActions || showCloseIcon) && (
              <div className="usx-popover__header-right-actions">
                {headerRightActions}
                {showCloseIcon && (
                  <Button
                    variant="unstyled"
                    className="usx-popover__header-action usx-popover__header-close"
                    aria-label={closeIconLabel}
                    iconProps={[{ name: 'close' }]}
                    extraAttributes={{ 'data-usx-popover-close': id }}
                  />
                )}
              </div>
            )}
          </header>
        )}
        {menuItems && menuItems.length > 0 && (
          <PopoverMenu items={menuItems} prefix={id} panelShape={panelShape} />
        )}
        {Boolean(children) && (
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
