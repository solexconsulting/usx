import React from 'react';
import classNames from 'classnames';
import Fieldset from '../fieldset/Fieldset';
import FormGroup from '../form-group/FormGroup';
import Checkbox from '../checkbox/Checkbox';

export interface CheckboxOption {
  id?: string;
  value: string;
  label: React.ReactNode;
  description?: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  tile?: boolean;
  small?: boolean;
  legend?: string;
  required?: boolean;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  name?: string;
  options: CheckboxOption[];
  className?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  tile = false,
  small = false,
  legend = 'Select one or more options',
  required = false,
  hint = null,
  error = null,
  name = 'checkbox-group',
  options = [],
  className = '',
  ...props
}) => {
  const classes = classNames('usa-checkbox-group', 'usx-checkbox-group', className);

  return (
    <FormGroup error={!!error}>
      <Fieldset legend={legend} required={required} hint={hint} error={error} className={classes} {...props}>
        {options.map((opt, idx) => {
          const id = opt.id || `${name}-${idx}`;
          return (
            <Checkbox
              key={id}
              id={id}
              name={name}
              value={opt.value}
              label={opt.label as string}
              description={opt.description}
              checked={!!opt.checked}
              disabled={!!opt.disabled}
              tile={tile}
              small={small}
            />
          );
        })}
      </Fieldset>
    </FormGroup>
  );
};

export default CheckboxGroup;
