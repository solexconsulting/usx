import React from 'react';
import classNames from 'classnames';
import Fieldset from '../fieldset/Fieldset';
import FormGroup from '../form-group/FormGroup';
import Checkbox, { type CheckboxProps } from '../checkbox/Checkbox';

export type CheckboxGroupItemProps = Omit<CheckboxProps, 'id'> & { id?: string };

export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  tile?: boolean;
  small?: boolean;
  legend?: string;
  required?: boolean;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  name?: string;
  checkboxProps: CheckboxGroupItemProps[];
  className?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  tile = false,
  small = false,
  legend,
  required = false,
  hint = null,
  error = null,
  name = 'checkbox-group',
  id: groupId,
  checkboxProps = [],
  className = '',
  ...props
}) => {
  const classes = classNames('usa-checkbox-group', 'usx-checkbox-group', className);

  return (
    <FormGroup error={!!error}>
      <Fieldset id={groupId} legend={legend} required={required} hint={hint} error={error} className={classes} {...props}>
        {checkboxProps.map((opt, idx) => {
          const id = opt.id || `${groupId || name}-${idx}`;
          return (
            <Checkbox
              key={id}
              name={name}
              tile={tile}
              small={small}
              {...opt}
              id={id}
            />
          );
        })}
      </Fieldset>
    </FormGroup>
  );
};

export default CheckboxGroup;
