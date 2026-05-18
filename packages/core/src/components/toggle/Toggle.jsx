import React, { useRef } from 'react';
import Icon from '../icon/Icon.jsx';
import './toggle.scss';

export default function Toggle({
  options = [],
  value,
  defaultValue,
  onChange,
  name,
  id,
  variant = 'text',
  disabled = false,
  className = '',
  ...props
}) {
  const idRef = useRef(id || name || `toggle-${Math.random().toString(36).substr(2, 8)}`);
  const generatedName = idRef.current;

  const classes = ['usa-button-group', 'usx-button-group', 'usa-button-group--segmented', 'usx-toggle', variant === 'icon' ? 'usx-toggle--icon' : '', className].filter(Boolean).join(' ');

  // Stateless: React only emits static HTML inputs/labels. Selection is controlled
  // by `value` or initial `defaultValue`. No internal handlers or keyboard logic.

  return (
    <ul className={classes} role="radiogroup" aria-disabled={disabled} {...props}>
      {options.map((opt, i) => {
        const optValue = typeof opt === 'object' ? opt.value ?? opt : opt;
        const optLabel = typeof opt === 'object' ? opt.label ?? opt : opt;
        const optIcon = typeof opt === 'object' ? opt.icon : null;
        const optDisabled = typeof opt === 'object' ? !!opt.disabled : false;
        const inputId = `${generatedName}-${i}`;
        return (
          <li key={inputId} className={`usa-button-group__item usx-toggle__item${optDisabled ? ' usx-toggle__item--disabled' : ''}`}>
            <input
              className="usx-toggle__input"
              type="radio"
              id={inputId}
              name={name || generatedName}
              value={optValue}
              checked={value === optValue ? true : undefined}
              defaultChecked={defaultValue === optValue ? true : undefined}
              disabled={disabled ? true : optDisabled ? true : undefined}
            />
            <label htmlFor={inputId} className="usa-button usx-button usa-button--outline">
              {variant === 'icon' && optIcon ? (
                <Icon name={optIcon} className="usx-toggle__label" ariaHidden />
              ) : (
                <span className="usx-toggle__label">{optLabel}</span>
              )}
            </label>
          </li>
        );
      })}
    </ul>
  );
}
