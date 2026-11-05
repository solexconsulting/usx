import React from 'react';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';

export type DrawerSide = 'inline-start' | 'inline-end' | 'top' | 'bottom';
export type DrawerSize = 'compact' | 'default' | 'wide';

export interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Unique dialog ID used by the native opener and close button. */
  id: string;
  /** Default visible trigger text. */
  label: string;
  /** Visible heading that names the dialog. */
  heading: string;
  /** Arbitrary semantic content, including forms, navigation, and nested overlays. */
  children: React.ReactNode;
  /** Optional composed trigger content, such as an icon and visible text. */
  trigger?: React.ReactNode;
  /** Accessible name for an icon-only trigger; include any visible trigger text. */
  triggerAriaLabel?: string;
  /** Logical side of the viewport; inline sides follow the writing direction. */
  side?: DrawerSide;
  /** Preferred width or height, depending on the side. */
  size?: DrawerSize;
  /** Brief text announced with the dialog heading. Omit for complex content. */
  description?: string;
  /** Optional persistent action area after the scrollable content. */
  footer?: React.ReactNode;
  /** Square off or round the edge facing the page content. Edges are square by default. */
  rounded?: boolean;
  /**
   * Require an action inside the drawer: omits the close button and disables light dismissal
   * and Escape. Provide a control in the content or footer that closes the drawer.
   */
  actionRequired?: boolean;
  /** Accessible name of the icon-only close button. */
  closeLabel?: string;
  /** Focus the heading on open; disable to focus the control marked `autoFocus` in the content. */
  focusHeading?: boolean;
  disabled?: boolean;
  triggerClassName?: string;
  panelClassName?: string;
  extraAttributes?: Record<string, unknown>;
}

/** A native dialog drawer with declarative open and close controls. */
export default function Drawer({
  id,
  label,
  heading,
  children,
  trigger,
  triggerAriaLabel,
  side = 'inline-end',
  size = 'default',
  description,
  footer,
  rounded = false,
  actionRequired = false,
  closeLabel = 'Close',
  focusHeading = true,
  disabled = false,
  className,
  triggerClassName,
  panelClassName,
  extraAttributes,
  ...props
}: DrawerProps) {
  // Lowercase native attributes work with React 18 and its current DOM typings.
  const opener = { commandfor: id, command: 'show-modal' };
  const closer = { commandfor: id, command: 'close' };
  const dismissal: Record<string, string | undefined> = {
    closedby: actionRequired ? 'none' : undefined,
  };

  return (
    <div {...props} className={ClassNames('usx-drawer', className)} {...extraAttributes}>
      <button
        type="button"
        className={triggerClassName || undefined}
        aria-haspopup="dialog"
        aria-controls={id}
        aria-label={triggerAriaLabel}
        disabled={disabled}
        {...opener}
      >
        {trigger ?? label}
      </button>
      <dialog
        id={id}
        className={ClassNames(
          'usx-drawer__panel',
          { 'usx-drawer__panel--rounded': rounded },
          panelClassName
        )}
        data-side={side}
        data-size={size}
        {...dismissal}
        aria-labelledby={`${id}-heading`}
        aria-describedby={description ? `${id}-description` : undefined}
      >
        {!actionRequired && (
          <button type="button" className="usx-drawer__close" {...closer}>
            <Icon name="close" size={3} alt={closeLabel} />
          </button>
        )}
        <header className="usx-drawer__header">
          <h2
            id={`${id}-heading`}
            className="usx-drawer__heading"
            tabIndex={focusHeading ? -1 : undefined}
            autoFocus={focusHeading}
          >
            {heading}
          </h2>
          {description && (
            <p id={`${id}-description`} className="usx-drawer__description">
              {description}
            </p>
          )}
        </header>
        <div className="usx-drawer__body">{children}</div>
        {footer && <footer className="usx-drawer__footer">{footer}</footer>}
      </dialog>
    </div>
  );
}
