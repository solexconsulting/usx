import React from 'react';
import classNames from 'classnames';
import Label from '../label/Label';
import Fieldset from '../fieldset/Fieldset';
import FormGroup from '../form-group/FormGroup';

export interface RadioOption {
  id?: string;
  value: string;
  label: React.ReactNode;
  ariaLabel?: string;
  description?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
}

export interface RadioButtonsProps extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  tile?: boolean;
  small?: boolean;
  legend?: string;
  required?: boolean;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  name?: string;
  options: RadioOption[];
  defaultValue?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  formGroup?: boolean;
  fieldset?: boolean;
  className?: string;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({
  tile = false,
  small = false,
  legend = 'Select one option',
  required = false,
  hint = null,
  error = null,
  name = 'radio-group',
  id: groupId,
  options = [],
  defaultValue = undefined,
  value,
  onChange,
  formGroup = true,
  fieldset = true,
  className = '',
  ...props
}) => {
  const classes = classNames('usa-radio', 'usx-radio', { 'usx-radio--small': small }, className);

  const inputClasses = classNames('usa-radio__input', { 'usa-radio__input--tile': tile });

  const optionsMarkup = options.map((opt, idx) => {
    const id = opt.id || `${groupId || name}-${idx}`;
    return (
      <div className={classes} key={id}>
        <input
          className={inputClasses}
          id={id}
          type="radio"
          name={name}
          value={opt.value}
          aria-label={opt.ariaLabel}
          {...(value !== undefined && onChange ? { checked: value === opt.value } : { defaultChecked: defaultValue === opt.value || !!opt.checked })}
          onChange={onChange}
          disabled={!!opt.disabled}
        />
        <Label className="usa-radio__label" classOverride={true} htmlFor={id}>
          {opt.label}
          {opt.description ? <span className="usa-checkbox__label-description">{opt.description}</span> : null}
        </Label>
      </div>
    );
  });

  const content = fieldset ? (
      <Fieldset
        id={groupId}
        legend={legend}
        required={required}
        hint={hint}
        error={error}
        {...props}
      >
        {optionsMarkup}
      </Fieldset>
  ) : optionsMarkup;
  return formGroup ? <FormGroup error={!!error}>{content}</FormGroup> : content;
};

export default RadioButtons;
