import React from 'react';
import classNames from 'classnames';
import Label from '../label/Label';
import Hint from '../hint/Hint';
import ErrorMessage from '../error-message/ErrorMessage';
import FormGroup from '../form-group/FormGroup';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onSelect' | 'defaultValue'> {
  id: string;
  name: string;
  label: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  hint?: React.ReactNode;
  placeholder?: string;
  defaultValue?: string | null;
  error?: React.ReactNode;
  options?: ComboboxOption[];
  onSearch?: (value: string) => void;
  onSelect?: (value: string, option: ComboboxOption | null) => void;
  formGroup?: boolean;
  className?: string;
}

// React only renders the standard USWDS combo box markup here. All interactive
// behavior (filtering, keyboard navigation, opening/closing the list, etc.) is
// owned by USWDS's own usa-combo-box JS. Call ONLY `comboBox.init()` once the
// markup mounts — never `.on()`/`.off()` — since most apps (and this repo's
// Storybook preview) already load a global USWDS bundle that calls `.on()`
// once for the whole page; calling it again attaches a second, independent
// set of delegated listeners and causes clicks to double-toggle and cancel
// out. See DatePicker/Modal for the same pattern.
export default function Combobox({
  id,
  name,
  label,
  disabled = false,
  required = false,
  hint = null,
  placeholder,
  defaultValue = null,
  error = null,
  options = [],
  onSearch,
  onSelect,
  formGroup = true,
  className = '',
  ...props
}: ComboboxProps) {
  const labelId = `${id}-label`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const handleChange = onSelect
    ? (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        const option = options.find(o => o.value === val) ?? null;
        onSelect(val, option);
      }
    : undefined;

  const handleInput = onSearch
    ? (e: React.FormEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target instanceof HTMLInputElement) onSearch(target.value);
      }
    : undefined;

  const content = (
    <>
      <Label id={labelId} htmlFor={id} required={required} error={!!error}>
        {label}
      </Label>

      {hint && <Hint id={hintId}>{hint}</Hint>}
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}

      <div
        className={
          classNames(
            'usa-combo-box',
            'usx-combo-box',
            {'usx-combo-box--error': !!error},
            className
          )
        }
        {...(placeholder ? { 'data-placeholder': placeholder } : {})}
        {...(defaultValue ? { 'data-default-value': defaultValue } : {})}
        {...(onSearch ? { onInput: handleInput } : {})}
      >
        <select
          className={classNames('usa-select', 'usx-select')}
          id={id}
          name={name}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </>
  );

  return formGroup ? <FormGroup error={!!error}>{content}</FormGroup> : content;
}
