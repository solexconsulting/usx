import React from 'react';
import classNames from 'classnames';
import Label from '../label/Label';
import Fieldset from '../fieldset/Fieldset';
import './radio-buttons.scss';

export interface RadioOption {
  id?: string;
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
}

export interface RadioButtonsProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  tile?: boolean;
  small?: boolean;
  legend?: string;
  required?: boolean;
  name?: string;
  options: RadioOption[];
  defaultValue?: string;
  className?: string;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({
  tile = false,
  small = false,
  legend = 'Select one option',
  required = false,
  name = 'radio-group',
  options = [],
  defaultValue = undefined,
  className = '',
  ...props
}) => {
  const classes = classNames(
    'usa-radio',
    'usx-radio',
    { 'usx-radio--small': small },
    className
  );

  const inputClasses = classNames(
    'usa-radio__input',
    { 'usa-radio__input--tile': tile }
  );

  return (
    <Fieldset legend={legend} required={required} {...props}>
      {options.map((opt, idx) => {
        const id = opt.id || `${name}-${idx}`;
        return (
          <div className={classes} key={id}>
            <input
              className={inputClasses}
              id={id}
              type="radio"
              name={name}
              value={opt.value}
              defaultChecked={defaultValue === opt.value || !!opt.checked}
              disabled={!!opt.disabled}
            />
            <Label className="usa-radio__label" classOverride={true} htmlFor={id}>
              {opt.label}
              {opt.description ? <span className="usa-checkbox__label-description">{opt.description}</span> : null}
            </Label>
          </div>
        );
      })}
    </Fieldset>
  );
};

export default RadioButtons;
