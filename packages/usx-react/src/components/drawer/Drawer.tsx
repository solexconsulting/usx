import React from 'react';
import ClassNames from 'classnames';

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
  /** Modal drawers make the page inert. Modeless drawers use native light dismissal. */
  modal?: boolean;
  /** Brief text announced with the dialog heading. Omit for complex content. */
  description?: string;
  /** Optional persistent action area after the scrollable content. */
  footer?: React.ReactNode;
  /** Visible close button text. */
  closeLabel?: string;
  /** Focus the heading on open; disable to focus the first control in the content. */
  focusHeading?: boolean;
  disabled?: boolean;
  triggerClassName?: string;
  panelClassName?: string;
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
  modal = true,
  description,
  footer,
  closeLabel = 'Close',
  focusHeading = true,
  disabled = false,
  className,
  triggerClassName,
  panelClassName,
  ...props
}: DrawerProps) {
  // Lowercase native attributes work with React 18 and its current DOM typings.
  const opener = modal ? { commandfor: id, command: 'show-modal' } : { popovertarget: id };
  const closer = modal
    ? { commandfor: id, command: 'close' }
    : { popovertarget: id, popovertargetaction: 'hide' };

  return (
    <div {...props} className={ClassNames('usx-drawer', className)}>
      <button
        type="button"
        className={ClassNames('usa-button', 'usx-button', 'usx-drawer__trigger', triggerClassName)}
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
        className={ClassNames('usx-drawer__panel', panelClassName)}
        data-side={side}
        data-size={size}
        popover={modal ? undefined : 'auto'}
        aria-labelledby={`${id}-heading`}
        aria-describedby={description ? `${id}-description` : undefined}
      >
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
        <button type="button" className="usx-drawer__close" {...closer}>
          {closeLabel}
        </button>
      </dialog>
    </div>
  );
}
