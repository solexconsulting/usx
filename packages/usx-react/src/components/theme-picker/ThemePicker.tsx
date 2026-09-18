import React, { useState } from 'react';
import ClassNames from 'classnames';

import Icon from '../icon/Icon';
import Label from '../label/Label';

export interface ThemePickerOption {
  value: string;
  label: string;
}

export interface ThemePickerProps {
  id?: string;
  name?: string;
  label?: string;
  themes?: ThemePickerOption[];
  value?: string;
  defaultValue?: string;
  // Fired when the trigger button opens the panel — actually applying a
  // theme (CSS variables, stylesheets, persistence, etc.) is the caller's
  // responsibility, not this component's.
  onOpen?: () => void;
  onChange?: (value: string) => void;
  className?: string;
}

export default function ThemePicker({
  id,
  name,
  label = 'Theme',
  themes = [],
  value,
  defaultValue,
  onChange,
  className = '',
}: ThemePickerProps) {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(defaultValue ?? themes[0]?.value ?? '');

  // The value actually shown — either the controlled `value` prop or the
  // internally-tracked selection for uncontrolled usage.
  const currentValue = value ?? activeTheme;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    if (value === undefined) {
      setActiveTheme(next);
    }
    onChange?.(next);
  };

  const selectId = id || `theme-picker-${Math.random().toString(36).substr(2, 9)}`;
  const classes = ClassNames('usx-theme-picker', { 'usx-theme-picker--open': open }, className);

  const themeOptions = themes.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className={classes}>
      {open ? (
        <div className="usx-theme-picker__panel">
          <Label htmlFor={selectId} screenReaderOnly>{label}</Label>
          <select
            id={selectId}
            name={name}
            className="usa-select usx-select"
            value={currentValue}
            onChange={handleChange}
          >
            {themeOptions}
          </select>
          <button
            type="button"
            className="usa-button usx-button usa-button--primary usx-theme-picker__toggle"
            aria-label="Confirm theme"
            onClick={() => setOpen(false)}
          >
            <Icon
              name="close"
            />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="usa-button usx-button usx-button--ghost usx-theme-picker__trigger"
          aria-label={label}
          onClick={() => setOpen(true)}
        >
          <PaletteIcon />
        </button>
      )}
    </div>
  );
}

function PaletteIcon() {
  return (
    <svg className="usa-icon usx-theme-picker__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}
