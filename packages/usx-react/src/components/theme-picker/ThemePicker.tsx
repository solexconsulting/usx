import React from 'react';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';
import Label from '../label/Label';
import Swap from '../swap/Swap';

export interface ThemePickerOption {
  value: string;
  label: string;
}

export type ThemePickerVariant = 'default' | 'swap' | 'ghost-select';

export interface ThemePickerProps {
  id?: string;
  name?: string;
  label?: string;
  themes?: ThemePickerOption[];
  /** Swap uses the first option for light and the second for dark. */
  variant?: ThemePickerVariant;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  extraAttributes?: Record<string, unknown>;
}

export default function ThemePicker({
  id,
  name,
  label = 'Theme',
  themes = [],
  variant = 'default',
  value,
  defaultValue,
  onChange,
  className = '',
  extraAttributes,
}: ThemePickerProps) {
  const selectId = id || 'theme-picker';
  const [localValue, setLocalValue] = React.useState(defaultValue ?? themes[0]?.value ?? '');
  const selectedValue = value ?? localValue;
  const selectedLabel = themes.find((option) => option.value === selectedValue)?.label ?? label;
  const choose = (next: string) => {
    if (value === undefined) setLocalValue(next);
    onChange?.(next);
  };
  const select = (hidden = false) => (
    <>
      <Label htmlFor={selectId} screenReaderOnly>
        {label}
      </Label>
      <select
        id={selectId}
        name={name}
        className={ClassNames(
          'usa-select usx-select',
          hidden && 'usx-theme-picker__select--hidden'
        )}
        value={selectedValue}
        onChange={(event) => choose(event.target.value)}
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
    >
      {variant === 'default' && (
        <>
          <button
            type="button"
            className="usa-button usx-button usx-button--ghost usx-theme-picker__trigger"
            aria-label={label}
            aria-expanded="false"
            aria-controls={`${selectId}-panel`}
          >
            <Icon name="color_palette" source="usx" className="usx-theme-picker__icon" />
          </button>
          <div id={`${selectId}-panel`} className="usx-theme-picker__panel">
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
            className="usx-theme-picker__swap usa-button usx-button usx-button--ghost"
            variant="rotate"
            inputProps={{
              checked: selectedValue === themes[1]?.value,
              'aria-label': `${label}: ${selectedLabel}. Switch to ${selectedValue === themes[1]?.value ? themes[0]?.label : themes[1]?.label}`,
              onChange: (event) => {
                event.stopPropagation();
                choose(themes[event.target.checked ? 1 : 0]?.value ?? '');
              },
            }}
            offContent={<Icon name="sun" source="usx" className="usx-theme-picker__icon" />}
            onContent={<Icon name="moon" source="usx" className="usx-theme-picker__icon" />}
          />
          <div className="usx-theme-picker__fallback">{select()}</div>
        </>
      )}
      {variant === 'ghost-select' && (
        <div className="usx-theme-picker__ghost">
          <span
            className="usa-button usx-button usx-button--ghost usx-theme-picker__ghost-face"
            aria-hidden="true"
          >
            <Icon name="color_palette" source="usx" className="usx-theme-picker__icon" />
          </span>
          {select(true)}
        </div>
      )}
    </div>
  );
}
