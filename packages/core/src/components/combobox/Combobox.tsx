import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import Label from '../label/Label';
import Hint from '../hint/Hint';
import ErrorMessage from '../error-message/ErrorMessage';
import FormGroup from '../form-group/FormGroup';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  label: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  hint?: React.ReactNode;
  placeholder?: string;
  value?: string;
  defaultValue?: string | null;
  error?: React.ReactNode;
  options?: ComboboxOption[];
  onSearch?: (value: string | null | undefined) => void;
  onSelect?: (value: string | null | undefined) => void;
  formGroup?: boolean;
  className?: string;
}

export default function Combobox({
  id,
  name,
  label,
  disabled = false,
  required = false,
  hint = null,
  placeholder = null,
  value,
  defaultValue = null,
  error = null,
  options = [],
  onSearch = null,
  onSelect = null,
  formGroup = true,
  className = '',
  ...props
}: ComboboxProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const [dropdownList, setDropdownList] = useState<ComboboxOption[]>(options);
  const [showList, setShowList] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [usedDefaultValue, setUsedDefaultValue] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setDropdownList(options);
    itemsRef.current = itemsRef.current.slice(0, options.length);
  }, [options]);

  useEffect(() => {
    if (showList && options.length > 0) setFocused(options[0].value);
  }, [showList, options]);

  useEffect(() => {
    if (defaultValue && !usedDefaultValue && options?.length) {
      setUsedDefaultValue(true);
      const defaultLabel = options.find(o => !!o.value && o.value === defaultValue)?.label;
      if (defaultLabel) setInputValue(defaultLabel);
    }
  }, [defaultValue, options]);

  useEffect(() => {
    if (value === undefined) return;
    const label = options.find((option) => option.value === value)?.label;
    if (label) setInputValue(label);
    else setInputValue('');
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowList(false);
        if (!inputValue) {
          setInputValue('');
          setDropdownList(options);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [options, inputValue]);

  const toggleList = () => setShowList(prev => !prev);

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (onSearch) {
      onSearch(val || undefined);
    } else {
      const filtered = options
        .filter(o => o.label.toLowerCase().includes(val.toLowerCase()))
        .sort((a, b) => a.label.localeCompare(b.label));
      setDropdownList(filtered);
    }

    if (!showList) setShowList(true);
  };

  const handleSelect = (option?: ComboboxOption) => {
    toggleList();
    if (option && option.value) {
      setInputValue(option.label);
    } else {
      setInputValue('');
    }
    setDropdownList(options);
    if (onSelect) onSelect(option?.value);
  };

  const handleClear = () => {
    setInputValue('');
    setDropdownList(options);
    setShowList(false);
    inputRef.current?.focus();
    if (onSearch) onSearch(null);
    if (onSelect) onSelect(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!showList) { setShowList(true); return; }
      const currentIndex = dropdownList.findIndex(o => o.value === focused);
      const newIndex = e.key === 'ArrowDown'
        ? Math.min(currentIndex + 1, dropdownList.length - 1)
        : Math.max(currentIndex - 1, 0);
      const newFocused = dropdownList[newIndex]?.value;
      if (newFocused != null) {
        setFocused(newFocused);
        itemsRef.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (showList) {
        const option = dropdownList.find(o => o.value === focused);
        handleSelect(option);
      } else {
        setShowList(true);
      }
    } else if (e.key === 'Tab' && showList) {
      setShowList(false);
    }
  };

  const selectedValue = options.find(o => o.label === inputValue)?.value ?? '';
  const listId = `${id}--list`;
  const labelId = `${id}-label`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  const focusedIndex = focused ? dropdownList.findIndex(o => o.value === focused) : -1;
  const focusedOptionId = focusedIndex >= 0 ? `${listId}--option-${focusedIndex}` : undefined;

  const wrapperClasses = classNames('usa-combo-box', 'usx-combo-box', {
    'usx-combo-box--error': !!error,
  }, className);

  const content = (
    <>
      <Label id={labelId} htmlFor={id} required={required} error={!!error}>
        {label}
      </Label>

      {hint && <Hint id={hintId}>{hint}</Hint>}
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}

      <div ref={wrapperRef} className={wrapperClasses} data-enhanced="true">
        <select
          className="usa-select usa-sr-only usa-combo-box__select"
          name={name}
          aria-hidden="true"
          tabIndex={-1}
          value={selectedValue}
          onChange={(e) => {
            const option = options.find(o => o.value === e.target.value);
            handleSelect(option);
          }}
          disabled={disabled || undefined}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <input
          type="text"
          role="combobox"
          aria-owns={listId}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-activedescendant={focusedOptionId}
          autoCapitalize="none"
          autoComplete="off"
          placeholder={placeholder ?? undefined}
          disabled={disabled || undefined}
          required={required || undefined}
          {...(describedBy ? { 'aria-describedby': describedBy } : {})}
          {...props}
          ref={inputRef}
          id={id}
          className="usa-combo-box__input"
          value={inputValue}
          onChange={handleTextInput}
          onKeyDown={handleKeyDown}
          onClick={() => setShowList(true)}
          onBlur={() => {}}
        />

        <span className="usa-combo-box__clear-input__wrapper" tabIndex={-1}>
          <button
            type="button"
            className="usa-combo-box__clear-input"
            aria-label="Clear the select contents"
            onClick={handleClear}
            disabled={disabled || undefined}
            style={inputValue ? undefined : { display: 'none' }}
          >&nbsp;</button>
        </span>

        <span className="usa-combo-box__input-button-separator">&nbsp;</span>

        <span className="usa-combo-box__toggle-list__wrapper" tabIndex={-1}>
          <button
            type="button"
            tabIndex={-1}
            className="usa-combo-box__toggle-list"
            aria-label="Toggle the dropdown list"
            onClick={toggleList}
            disabled={disabled || undefined}
          >&nbsp;</button>
        </span>

        <ul
          id={listId}
          className="usa-combo-box__list"
          role="listbox"
          aria-labelledby={labelId}
          hidden={!showList}
          tabIndex={-1}
        >
          {dropdownList.length > 0
            ? dropdownList.map((opt, index) => {
                if (!opt.value) return null;
                return (
                  <li
                    key={opt.value}
                    ref={el => (itemsRef.current[index] = el)}
                    id={`${listId}--option-${index}`}
                    className={classNames('usa-combo-box__list-option', {
                      'usa-combo-box__list-option--focused': focused === opt.value,
                      'usa-combo-box__list-option--selected': selectedValue === opt.value,
                    })}
                    role="option"
                    aria-selected={selectedValue === opt.value}
                    aria-setsize={dropdownList.length}
                    aria-posinset={index + 1}
                    data-value={opt.value}
                    tabIndex={focused === opt.value ? 0 : -1}
                    onMouseEnter={() => setFocused(opt.value)}
                    onMouseLeave={() => setFocused(opt.value)}
                  >
                    {opt.label}
                  </li>
                );
              }
            )
            : (
              <li className="usa-combo-box__list-option usa-combo-box__list-option--no-results">
                No results found
              </li>
            )
          }
        </ul>

        <div className="usa-combo-box__status usa-sr-only" role="status" aria-live="polite" />
      </div>
    </>
  );

  return formGroup ? <FormGroup error={!!error}>{content}</FormGroup> : content;
}
