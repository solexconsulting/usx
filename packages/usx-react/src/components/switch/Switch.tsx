import React from 'react';
import ClassNames from 'classnames';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: string;
  className?: string;
  label?: React.ReactNode;
  indeterminate?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  id,
  name,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  size = 'md',
  variant = '',
  className = '',
  label,
  indeterminate = false,
  ...props
}) => {
  const classes = ClassNames(
    'usx-switch',
    size && `usx-toggle-${size}`,
    variant && `text-${variant}`,
    className,
  );

  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  const inputProps = {
    id,
    name,
    type: 'checkbox',
    className: classes,
    checked: typeof checked === 'boolean' ? checked : undefined,
    defaultChecked,
    disabled,
    'aria-checked': indeterminate ? 'mixed' : (typeof checked === 'boolean' ? checked : undefined),
    onChange,
    ...props,
  };

  const input = <input ref={ref} {...inputProps} />;

  if (label) {
    return (
      <label className="usa-label usx-switch__label">
        {input}
        {label}
      </label>
    );
  }

  return input;
};

export default Switch;
