import React, { useId } from 'react';
import ClassNames from 'classnames';
import Icon from '../icon/Icon';

export interface ToggleOption {
  value?: string | number;
  label?: React.ReactNode;
  icon?: string;
  disabled?: boolean;
}

export interface ToggleProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onChange'> {
  className?: string;
  id?: string;
  options?: (ToggleOption | string | number)[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  name?: string;
  ariaLabel?: string;
  variant?: 'text' | 'icon';
  disabled?: boolean;
  required?: boolean;
}

export default function Toggle({
  options = [],
  value,
  defaultValue,
  onChange,
  name,
  id,
  ariaLabel,
  variant = 'text',
  disabled = false,
  required = false,
  className,
  'aria-label': nativeAriaLabel,
  'aria-labelledby': labelledBy,
  ...props
}: ToggleProps) {
  const instanceId = useId();
  const groupId = id || `toggle-${instanceId}`;
  const groupName = name || groupId;
  const controlled = value !== undefined;
  return (
    <ul
      {...props}
      id={groupId}
      className={ClassNames(
        'usx-toggle',
        'usa-button-group',
        variant === 'icon' && 'usx-toggle--icon',
        className
      )}
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-label={
        labelledBy ? undefined : ariaLabel || nativeAriaLabel || name || 'Choose an option'
      }
      aria-disabled={disabled || undefined}
      aria-required={required || undefined}
    >
      {options.map((option, index) => {
        const opt = typeof option === 'object' ? option : { value: option, label: option };
        const optionValue =
          opt.value ??
          (typeof opt.label === 'string' || typeof opt.label === 'number' ? opt.label : index);
        const optionLabel = opt.label ?? String(optionValue);
        const inputId = `${groupId}-option-${index}`;
        const iconOnly = variant === 'icon' && Boolean(opt.icon);
        return (
          <li key={inputId} className="usa-button-group__item" role="presentation">
            <input
              className="usx-toggle__input"
              type="radio"
              id={inputId}
              name={groupName}
              value={optionValue}
              {...(controlled
                ? { checked: value === optionValue }
                : { defaultChecked: defaultValue === optionValue })}
              disabled={disabled || opt.disabled}
              required={required}
              onChange={(event) => {
                if (event.target.checked) onChange?.(optionValue);
              }}
            />
            <label
              htmlFor={inputId}
              className="usa-button usx-button usa-button--primary usx-toggle__button"
              aria-disabled={disabled || opt.disabled || undefined}
              title={
                iconOnly && (typeof optionLabel === 'string' || typeof optionLabel === 'number')
                  ? String(optionLabel)
                  : undefined
              }
            >
              {opt.icon && <Icon name={opt.icon} className="usx-toggle__icon" aria-hidden="true" />}
              <span className={iconOnly ? 'usa-sr-only' : undefined}>
                {optionLabel}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
