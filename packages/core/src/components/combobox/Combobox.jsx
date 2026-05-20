import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './combobox.scss';

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
  className = '',
  ...props
}) {
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const itemsRef = useRef([]);

  const [dropdownList, setDropdownList] = useState(options);
  const [showList, setShowList] = useState(false);
  const [focused, setFocused] = useState(null);
  const [usedDefaultValue, setUsedDefaultValue] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Sync dropdown list when options prop changes (e.g. external search results arrive)
  useEffect(() => {
    setDropdownList(options);
    itemsRef.current = itemsRef.current.slice(0, options.length);
  }, [options]);

  // Focus first item when list opens or options change while list is open
  useEffect(() => {
    if (showList && options.length > 0) setFocused(options[0].value);
  }, [showList, options]);

  // Apply defaultValue once options are available (mirrors NCBI's initialValue pattern)
  useEffect(() => {
    if (defaultValue && !usedDefaultValue && options?.length) {
      setUsedDefaultValue(true);
      const defaultLabel = options.find(o => !!o.value && o.value === defaultValue)?.label;
      if (defaultLabel) setInputValue(defaultLabel);
    }
  }, [defaultValue, options]);

  // Set input value if controlled via `value` prop (only when value is explicitly provided)
  useEffect(() => {
    if (value === undefined) return;
    const label = options.find((option) => option.value === value)?.label;
    if (label) setInputValue(label);
    else setInputValue('');
  }, [value]);

  // Close on outside mousedown (mirrors NCBI's handleClickOutside)
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
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

  const handleTextInput = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (onSearch) {
      // External search mode: caller updates options prop with results
      console.log("Search input changed. Searching for:", val);
      onSearch(val || undefined);
    } else {
      // Internal filter mode
      const filtered = options
        .filter(o => o.label.toLowerCase().includes(val.toLowerCase()))
        .sort((a, b) => a.label.localeCompare(b.label));
      setDropdownList(filtered);
    }

    if (!showList) setShowList(true);
  };

  const handleSelect = (option) => {
    toggleList();
    if (option && option.value) {
      console.log("Selected option:", option.label);
      setInputValue(option.label)
    } else {
      setInputValue('');
    }
    setDropdownList(options);
    if (onSelect) onSelect(option.value);
  };

  const handleClear = () => {
    setInputValue('');
    setDropdownList(options);
    setShowList(false);
    inputRef.current?.focus();
    if (onSearch) onSearch(null);
    if (onSelect) onSelect(null);
  };

  const handleKeyDown = (e) => {
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
        console.log("Enter key pressed. Focused option:", option);
        handleSelect(option)
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

  return (
    <>
      <label className="usa-label usx-label" id={labelId} htmlFor={id}>
        {required && <abbr title="required" className="usx-required">*</abbr>}
        {label}
      </label>

      {hint && <span className="usa-hint usx-hint" id={hintId}>{hint}</span>}
      {error && <span className="usa-error-message usx-error-message" id={errorId}>{error}</span>}

      <div ref={wrapperRef} className={wrapperClasses} data-enhanced="true">
        {/* Hidden select keeps the committed value for native form submission */}
        <select
          className="usa-select usa-sr-only usa-combo-box__select"
          name={name}
          aria-hidden="true"
          tabIndex={-1}
          value={selectedValue}
          onChange={(e) => {
            const option = options.find(o => o.value === e.target.value);
            console.log("Select changed. Selected option:", option);
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
                if (!opt.value) return null; // Skips <option value>Select a fruit</option>
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
}

Combobox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  hint: PropTypes.node,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  error: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  className: PropTypes.string,
};
