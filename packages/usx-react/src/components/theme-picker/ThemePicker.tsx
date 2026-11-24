import React from 'react';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';
import Label from '../label/Label';
import Popover, { type PopoverAlign } from '../popover/Popover';
import Swap from '../swap/Swap';

export interface ThemePickerOption {
  /** Value written to <html data-usx-theme>. */
  value: string;
  label: string;
}

export type ThemePickerVariant = 'default' | 'swap' | 'popover';

export interface ThemePickerProps {
  id?: string;
  name?: string;
  label?: string;
  themes?: ThemePickerOption[];
  /** Swap uses the first option for light and the second for dark. */
  variant?: ThemePickerVariant;
  /** Alignment of the panel when variant is popover. */
  popoverAlign?: PopoverAlign;
  value?: string;
  defaultValue?: string;
  className?: string;
  extraAttributes?: Record<string, unknown>;
}

export default function ThemePicker({
  id,
  name,
  label = 'Theme',
  themes = [],
  variant = 'default',
  popoverAlign = 'start',
  value,
  defaultValue,
  className = '',
  extraAttributes,
}: ThemePickerProps) {
  const fieldId = id || 'theme-picker';
  const selectedValue = value ?? defaultValue ?? themes[0]?.value ?? '';
  const select = () => (
    <>
      <Label htmlFor={fieldId} screenReaderOnly>
        {label}
      </Label>
      <select
        id={fieldId}
        name={name}
        className="usa-select usx-select"
        defaultValue={selectedValue}
      >
        {themes.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );

  return (
    <div
      className={ClassNames(
        'usx-theme-picker',
        variant !== 'default' && `usx-theme-picker--${variant}`,
        className
      )}
      {...extraAttributes}
      hidden
    >
      {variant === 'default' && (
        <>
          <button
            type="button"
            className="usa-button usx-button usx-button--ghost usx-theme-picker__trigger"
            aria-label={label}
            aria-expanded="false"
            aria-controls={`${fieldId}-panel`}
          >
            <Icon name="color_palette" source="usx" className="usx-theme-picker__icon" />
          </button>
          <div id={`${fieldId}-panel`} className="usx-theme-picker__panel">
            {select()}
            <button
              type="button"
              className="usa-button usx-button usa-button--primary usx-theme-picker__toggle"
              aria-label="Confirm theme"
            >
              <Icon name="close" className="usx-theme-picker__icon" />
            </button>
          </div>
        </>
      )}
      {variant === 'swap' && (
        <>
          <Swap
            as="button"
            className="usx-theme-picker__swap usx-button--ghost usx-button--tight"
            variant="rotate"
            defaultPressed={selectedValue === themes[1]?.value}
            ariaLabel={`${themes[1]?.label ?? ''} ${label}`.trim()}
            data-usx-theme-off={themes[0]?.value}
            data-usx-theme-on={themes[1]?.value}
            offContent={<Icon name="sun" source="usx" className="usx-theme-picker__icon" />}
            onContent={<Icon name="moon" source="usx" className="usx-theme-picker__icon" />}
          />
          <input id={fieldId} type="hidden" name={name} defaultValue={selectedValue} />
        </>
      )}
      {variant === 'popover' && (
        <>
          <Popover
            id={`${fieldId}-panel`}
            className="usx-theme-picker__popover"
            align={popoverAlign}
            panelShape="square"
            summaryProps={{
              className: 'usa-button usx-button usx-button--ghost usx-button--tight margin-0',
              ariaLabel: label,
              children: (
                <Icon name="color_palette" source="usx" className="usx-theme-picker__icon" />
              ),
            }}
            menuItems={themes.map((theme) => ({
              type: 'button',
              text: theme.label,
              extraAttributes: {
                'data-usx-theme-value': theme.value,
                'aria-pressed': theme.value === selectedValue,
              },
            }))}
          />
          <input id={fieldId} type="hidden" name={name} defaultValue={selectedValue} />
        </>
      )}
    </div>
  );
}
